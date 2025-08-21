const models: App.Model[] = [
	{
		name: 'Mistral Medium 3',
		description: 'State-of-the-art performance. Simplified enterprise deployments. Cost-efficient.',
		api: 'mistral-medium-latest',
		provider: 'mistral',
		author: 'mistral',
		icon: 'mistral.svg'
	},
	{
		name: 'Magistral Medium',
		description:
			'Thinking model excelling in domain-specific, transparent, and multilingual reasoning.',
		api: 'magistral-medium-latest',
		provider: 'mistral',
		author: 'mistral',
		reasoning: true,
		icon: 'mistral.svg'
	},
	{
		name: 'Mistral Small',
		description: 'SOTA. Multimodal. Multilingual. Apache 2.0.',
		api: 'mistral-small-latest',
		provider: 'mistral',
		author: 'mistral',
		icon: 'mistral.svg'
	},
	{
		name: 'Mistral Large',
		description: "Mistral AI's Mistral Large model",
		api: 'mistral-large-latest',
		provider: 'mistral',
		author: 'mistral',
		icon: 'mistral.svg'
	},
	{
		name: 'Mistral 7b',
		description: 'The latest Mistral model with a context length of 32k.',
		api: 'mistral:latest',
		provider: 'ollama',
		author: 'mistral',
		icon: 'mistral.svg'
	},
	{
		name: 'Gemma 3',
		description: 'The current, most capable model that runs on a single GPU.',
		api: 'gemma3:4b',
		provider: 'ollama',
		author: 'google',
		icon: 'gemma.svg'
	},
	{
		name: 'Gemma 3 270M',
		description: 'The current, most capable model that runs on a single GPU.',
		api: 'gemma3:270m',
		provider: 'ollama',
		author: 'google',
		icon: 'gemma.svg'
	},
	{
		name: 'Qwen 3',
		description: 'The latest Qwen 3 model with a context length of 128k.',
		api: 'qwen3:latest',
		provider: 'ollama',
		author: 'qwen',
		icon: 'qwen.svg'
	},
	{
		name: 'Llama 3.2',
		description: 'The latest Llama 3 model with a context length of 128k.',
		api: 'llama3.2:latest',
		provider: 'ollama',
		author: 'meta',
		icon: 'meta.svg'
	},
	{
		name: 'GPT-o4-mini',
		description: "OpenAI's o4-mini model",
		api: 'o4-mini',
		provider: 'openai',
		reasoning: true,
		author: 'openai',
		icon: 'openai.svg'
	},
	{
		name: 'GPT-4o',
		description: "OpenAI's GPT-4o model",
		api: 'gpt-4o',
		provider: 'openai',
		author: 'openai',
		icon: 'openai.svg'
	},
	{
		name: 'GPT-4o-mini',
		description: "OpenAI's GPT-4o-mini model",
		api: 'gpt-4o-mini',
		provider: 'openai',
		author: 'openai',
		icon: 'openai.svg'
	},
	{
		name: 'GPT-4.1',
		description: "OpenAI's GPT-4.1 model",
		api: 'gpt-4.1',
		provider: 'openai',
		author: 'openai',
		icon: 'openai.svg'
	},
	{
		name: 'GPT-4.1-mini',
		description: "OpenAI's GPT-4.1-mini model",
		api: 'gpt-4.1-mini',
		provider: 'openai',
		author: 'openai',
		icon: 'openai.svg'
	}
];

export default models;
