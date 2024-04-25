import ollama from "ollama/browser";
import { initialModels } from "$lib/stores/models";

/**
 * Load models from API and merge with initial models.
 * @type {import('./$types').LayoutServerLoad}
 */
export async function load({fetch}) {
  // Create a deep copy of initialModels to avoid mutating the original array
  let models = JSON.parse(JSON.stringify(initialModels));

  try {
    async function fetchModels() {
      const url = "http://127.0.0.1:11434/api/tags"
      const request = fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await request;
      console.log("response", response);
      return response.json();
    }

    let { models: apiModels } = await fetchModels(); // ollama.list();

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
