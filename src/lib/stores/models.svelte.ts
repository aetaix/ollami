import staticModels from '$lib/models';
import ollama from 'ollama';

// Export all models
export let models = $state<App.Model[]>(staticModels);

// Fetch installed models from Ollama
const installedModels = await ollama.list();

// Export available models
export let availableModels = $state(
	staticModels.filter((model) => {
		if (model.provider === 'ollama') {
			return installedModels.models.some((installedModel) => installedModel.model === model.api);
		} else {
			return true; // we return all api based models
		}
	})
);

// Export the selected model
let selectedModel = $state<App.Model>(models[0]);

export function getSelectedModel() {
	return selectedModel;
}

export function setSelectedModel(model: App.Model) {
	selectedModel = model;
}
