import { ollamaModels } from '$lib/models/ollama';
import { mistralModels } from '$lib/models/mistral';
import { openaiModels } from '$lib/models/openai';

export interface Model {
	name: string;
	description?: string;
	api: string;
	provider: 'mistral' | 'openai' | 'ollama';
}

// Combine all models
export let models = $state<Model[]>([...ollamaModels, ...mistralModels, ...openaiModels]);

let selectedModel = $state<Model>(models[0]);

export function getSelectedModel() {
	return selectedModel;
}

export function setSelectedModel(model: Model) {
	selectedModel = model;
}
