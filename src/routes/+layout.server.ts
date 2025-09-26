import ollama from 'ollama';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const ollamaModels = await ollama.list();

	const models = new Set<string>(
		ollamaModels?.models?.map((m: { model: string }) => m.model) ?? []
	);

	return {
		models
	};
};
