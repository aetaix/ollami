export interface Model {
	name: string;
	description?: string;
	api: string;
}

export let models = $state<Model[]>([
	{
		name: 'Mistral Medium 3.1',
		description: "Mistral AI's Mistral Medium 3.1 model",
		api: 'mistral-medium-latest'
	},
	{
		name: 'Mistral Small',
		description: "Mistral AI's Mistral Small 3.1 model",
		api: 'mistral-small-latest'
	}
]);
