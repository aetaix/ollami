import staticModels from '$lib/models';
import ollama from 'ollama';

// Export all models
export let models = $state<App.Model[]>(staticModels);

// Fetch installed models from Ollama
const installedModels = await ollama.list();


// Extend the model object with installation status
export let extendedModels = $state(
	staticModels.map((model) => {
		const isInstalled = installedModels.models.some((installedModel) => installedModel.model === model.api);
		return { ...model, installed: isInstalled };
	})
);

// Export the selected model
let selectedModel = $state<App.Model>(extendedModels[0]);

export function getSelectedModel() {
	return selectedModel;
}

export function setSelectedModel(model: App.Model) {
	selectedModel = model;
}
