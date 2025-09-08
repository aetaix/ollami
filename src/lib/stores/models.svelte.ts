import staticModels from '$lib/models';

// Export all models
export let models = $state<App.Model[]>(staticModels);

// Extend the model object with installation status (initialized to false; refreshed in browser)
export let extendedModels = $state(
	staticModels.map((model) => ({ ...model, installed: false }))
);

// Export the selected model
let selectedModel = $state<App.Model>(extendedModels[0]);

export function getSelectedModel() {
	return selectedModel;
}

export function setSelectedModel(model: App.Model) {
	selectedModel = model;
}


