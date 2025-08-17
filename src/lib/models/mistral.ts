export const mistralModels: App.Model[] = [
	{
		name: 'Mistral Medium 3',
		description: 'State-of-the-art performance. Simplified enterprise deployments. Cost-efficient.',
		api: 'mistral-medium-latest',
		provider: 'mistral'
	},
	{
		name: 'Magistral Medium',
		description:
			'Thinking model excelling in domain-specific, transparent, and multilingual reasoning.',
		api: 'magistral-medium-latest',
		provider: 'mistral',
		reasoning: true
	},
	{
		name: 'Mistral Small',
		description: 'SOTA. Multimodal. Multilingual. Apache 2.0.',
		api: 'mistral-small-latest',
		provider: 'mistral'
	},
	{
		name: 'Mistral Large',
		description: "Mistral AI's Mistral Large model",
		api: 'mistral-large-latest',
		provider: 'mistral'
	}
];
