import { initialModels } from "$lib/stores/models";
import { fetchOllama } from "$lib/utils/ollamaClient";

const modelsService = {
  async loadModels() {
    let models = [...initialModels];
    //let companions = [];
    try {
      const { models: apiModels } = await fetchOllama("/api/tags", "GET");
      const modelMap = models.reduce((dict, model) => ({ ...dict, [model.image]: model }), {});

      apiModels.forEach((apiModel) => {
        const model = modelMap[apiModel.model];
        if (model) {
          model.installed = true;
        } /*else {
          companions.push(apiModel);
        }*/
      });

      return { models, /*companion*/ };
    } catch (error) {
      console.error("Failed to load models:", error);
      // Handle errors or return a default error state
      return models.map(model => ({ ...model, error: "Failed to load data from Ollama." }));
    }
  },
};

/**
 * Load models from API and merge with initial models.
 * @type {import('./$types').LayoutServerLoad}
 */
export async function load() {
  const {models, companions} = await modelsService.loadModels();
  return { props: { models, /*companions*/ } };
}