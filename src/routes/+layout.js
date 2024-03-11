import ollama from "ollama";
import { initialModels } from "$lib/stores/models";

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
  // Create a deep copy of initialModels to avoid mutating the original array
  let transformedModels = JSON.parse(JSON.stringify(initialModels));


  let list = await ollama.list();

  if (!list.models.length > 0) {
    return {
      props: {
        models: transformedModels,
      },
    };
  }
  list.models.forEach((model) => {
    let localModel = transformedModels.find((m) => m.image === model.model);
    if (localModel) {
      localModel.installed = true;
    }

    if (!transformedModels.some((m) => m.image === model.model)) {
      transformedModels.push({
        name: model.model,
        image: model.model,
        parameters: model.details.parameter_size,
        size: (model.size / 1024 / 1024 / 1024).toFixed(2),
        installed: true,
        derived: true,
        description: model.details.description,
      });
    }
  });
 
  return {
    props: {
      models: transformedModels,
    },
  };
}
