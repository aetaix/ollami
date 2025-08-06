export interface Model {
	name: string;
	description?: string;
	api: string;
}

export let models = $state<Model[]>([
	{
		name: 'Mistral Medium 3',
		description: "Mistral AI's Mistral Medium 3 model",
		api: 'mistral-medium-latest'
	},
	{
		name: 'Mistral Small',
		description: "Mistral AI's Mistral Small model",
		api: 'mistral-small-latest'
	},
	{
		name: "Mistral Large",
		description: "Mistral AI's Mistral Large model",
		api: 'mistral-large-latest'
	}
]);
