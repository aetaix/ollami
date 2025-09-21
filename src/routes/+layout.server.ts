import ollama from 'ollama';
import type { LayoutServerLoad } from './$types';
// import staticModels from '$lib/models';
// import { extendedModels, getSelectedModel, setSelectedModel } from '$lib/stores/models.svelte';

export const load: LayoutServerLoad = async () => {
	const installedModels = await ollama.list();

	const installedSet = new Set<string>(
		installedModels?.models?.map((m: { model: string }) => m.model) ?? []
	);

	return {
		installedSet
	};
};
