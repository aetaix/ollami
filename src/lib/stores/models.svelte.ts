import staticModels from '$lib/models';
import { browser } from '$app/environment';

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

// Fetch installed models from our server API (avoids bundling node-only deps in browser)
async function loadInstalledModels() {
	if (!browser) return; // Only run in the browser
	try {
		const res = await fetch('/api/models/ollama/list', { method: 'POST' });
		if (!res.ok) throw new Error(`Failed to fetch installed models (${res.status})`);
		const data = await res.json();
		const installedSet = new Set<string>(data?.models?.map((m: { model: string }) => m.model) ?? []);
	const updated = staticModels.map((model) => ({ ...model, installed: installedSet.has(model.api) }));
	// mutate instead of reassigning exported state
	extendedModels.length = 0;
	extendedModels.push(...updated);

		// Keep selected model stable; if it no longer exists, fallback to first
	if (!extendedModels.find((m) => m.api === selectedModel?.api)) {
			selectedModel = extendedModels[0];
		}
	} catch (err) {
		console.error('Failed to load installed models', err);
	}
}

// Kick off initial load in browser
if (browser) {
	// Fire-and-forget; consumers can also call refreshInstalledModels()
	loadInstalledModels();
}

export function refreshInstalledModels() {
	return loadInstalledModels();
}
