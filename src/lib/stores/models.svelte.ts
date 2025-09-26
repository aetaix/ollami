interface ModelState {
	models: App.Model[];
	selectedModel: App.Model | null;
}

export const models = $state<ModelState>({
	models: [],
	selectedModel: null
});
