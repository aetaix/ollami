import { initialModels } from "$lib/stores/models";
import {fetchOllama} from "$lib/utils/ollamaClient";
/**
 * Load models from API and merge with initial models.
 * @type {import('./$types').LayoutServerLoad}
 */
export async function load({fetch}) {
  // Create a deep copy of initialModels to avoid mutating the original array
  let models = JSON.parse(JSON.stringify(initialModels));

  try {
    let { models: apiModels } = await fetchOllama("/api/tags", "GET") || []; // ollama.list();

    if (apiModels.length === 0) {
      return { props: { models } };
    }

    const modelMap = new Map(models.map((model) => [model.image, model]));

    apiModels.forEach((apiModel) => {
      let model = modelMap.get(apiModel.model);

      if (model) {
        model.installed = true;
      } else {
        const sizeGB = (apiModel.size / 1024 / 1024 / 1024).toFixed(2);
        models.push({
          name: apiModel.model,
          image: apiModel.model,
          parameters: apiModel.details.parameter_size,
          size: sizeGB,
          installed: true,
          tags: ["custom"],
          derived: true,
          description: apiModel.details.description,
        });
      }
    });

    return { props: { models } };
  } catch (error) {
    console.error("Failed to load models:", error);
    // Handle errors or return a default error state
    return { props: { models: [], error: "Failed to load data from Ollama." } };
  }
}
