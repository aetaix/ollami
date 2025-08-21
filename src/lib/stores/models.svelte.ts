import allModels from '$lib/models';

// Combine all models
export let models = $state<App.Model[]>(allModels);

let selectedModel = $state<App.Model>(models[0]);

export function getSelectedModel() {
	return selectedModel;
}

export function setSelectedModel(model: App.Model) {
	selectedModel = model;
}
