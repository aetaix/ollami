
import ollama from 'ollama';
import type { LayoutLoad } from './$types';
import staticModels from '$lib/models';
import { extendedModels, getSelectedModel, setSelectedModel } from '$lib/stores/models.svelte';

export const load: LayoutLoad = async () => {
	const installedModels = await ollama.list();
	const installedSet = new Set<string>(
		installedModels?.models?.map((m: { model: string }) => m.model) ?? []
	);
	const updated = staticModels.map((model) => ({
		...model,
		installed: installedSet.has(model.api)
	}));
	extendedModels.length = 0;
	extendedModels.push(...updated);

	const selectedModel = getSelectedModel();
	if (!extendedModels.find((m) => m.api === selectedModel?.api)) {
		setSelectedModel(extendedModels[0]);
	}
};

