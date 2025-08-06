export interface Model {
	name: string;
	description?: string;
	api: string;
	provider: 'mistral' | 'openai' | 'ollama';
}

export let models = $state<Model[]>([
	{
		name: 'Mistral Medium 3',
		description: "Mistral AI's Mistral Medium 3 model",
		api: 'mistral-medium-latest',
		provider: 'mistral'
	},
	{
		name: 'Mistral Small',
		description: "Mistral AI's Mistral Small model",
		api: 'mistral-small-latest',
		provider: 'mistral'
	},
	{
		name: 'Mistral Large',
		description: "Mistral AI's Mistral Large model",
		api: 'mistral-large-latest',
		provider: 'mistral'
	},

	{
		name: 'GPT-4o',
		description: "OpenAI's GPT-4o model",
		api: 'gpt-4o',
		provider: 'openai'
	},
	{
		name: 'GPT-4o-mini',
		description: "OpenAI's GPT-4o-mini model",
		api: 'gpt-4o-mini',
		provider: 'openai'
	},
	{
		name: 'GPT-4.1',
		description: "OpenAI's GPT-4.1 model",
		api: 'gpt-4.1',
		provider: 'openai'
	},
	{
		name: 'GPT-4.1-mini',
		description: "OpenAI's GPT-4.1-mini model",
		api: 'gpt-4.1-mini',
		provider: 'openai'
	}
]);
