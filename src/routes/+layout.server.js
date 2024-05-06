import { initialModels } from '$lib/stores/models';
import { fetchOllama } from '$lib/utils/ollamaClient';

export const prerender = true;

const modelsService = {
	async loadModels() {
		const { models: apiModels } = await fetchOllama('/api/tags', 'GET');
		const models = [...initialModels];
		try {
			// compare models with apiModels and set the ones that are common to instaled=true

			const processedModels = models.map((model) => {
				const compare = apiModels.find((apiModel) => apiModel.model === model.image);
				if (compare) {
					return { ...model, installed: true };
				} else {
					return { ...model, installed: false };
				}
			});

			return processedModels;
		} catch (error) {
			console.error('Failed to load models:', error);
			// Handle errors or return a default error state
			return models.map((model) => ({ ...model, error: 'Failed to load data from Ollama.' }));
		}
	}
};

/**
 * Load models from API and merge with initial models.
 * @type {import('./$types').LayoutServerLoad}
 */
export async function load() {
	const models = await modelsService.loadModels();
	return { props: { models } };
}
