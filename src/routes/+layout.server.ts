import ollama from 'ollama';
import type { LayoutServerLoad } from './$types';

interface OllamaModel {
	model: string;
}

interface OllamaModelsResponse {
	models?: OllamaModel[];
}

export const load: LayoutServerLoad = async () => {
	try {
		const ollamaModelsResponse: OllamaModelsResponse = await ollama.list();
		const availableModels = new Set<string>(
			ollamaModelsResponse.models?.map((model) => model.model) ?? []
		);

		return {
			models: availableModels
		};
	} catch (error) {
		console.error('Failed to fetch Ollama models:', error);
		return {
			models: new Set<string>()
		};
	}
};
