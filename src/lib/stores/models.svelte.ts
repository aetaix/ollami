import { ollamaModels } from '$lib/models/ollama';
import { mistralModels } from '$lib/models/mistral';
import { openaiModels } from '$lib/models/openai';

// Combine all models
export let models = $state<App.Model[]>([ ...mistralModels,...ollamaModels, ...openaiModels]);

let selectedModel = $state<App.Model>(models[0]);

export function getSelectedModel() {
	return selectedModel;
}

export function setSelectedModel(model: App.Model) {
	selectedModel = model;
}
