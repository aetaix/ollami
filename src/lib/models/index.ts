// this is the source of thruth for all our model base

const models: App.Model[] = [
	{
		name: 'Mistral Medium 3.1',
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
		name: "Ministral 3",
		description:"The Ministral 3 family is designed for edge deployment, capable of running on a wide range of hardware.",
		api: 'ministral-3',
		provider: 'ollama',
		author: 'mistral',
		parameters: '3b',
		icon: 'mistral.svg',
		size: 3
	},
		{
		name: "Ministral 3",
		description:"The Ministral 3 family is designed for edge deployment, capable of running on a wide range of hardware.",
		api: 'ministral-3',
		provider: 'ollama',
		author: 'mistral',
		parameters: '8b',
		icon: 'mistral.svg',
		size: 6
	},
		{
		name: "Ministral 3",
		description:"The Ministral 3 family is designed for edge deployment, capable of running on a wide range of hardware.",
		api: 'ministral-3',
		provider: 'ollama',
		author: 'mistral',
		parameters: '14b',
		icon: 'mistral.svg',
		size: 9.1
	},
	{
		name: 'Mistral Small 3.2',
		description: 'SOTA. Multimodal. Multilingual. Apache 2.0.',
		api: 'mistral-small-latest',
		provider: 'mistral',
		author: 'mistral',
		icon: 'mistral.svg'
	},
	{
		name: 'Mistral Large 2',
		description: "Mistral AI's Mistral Large model",
		api: 'mistral-large-latest',
		provider: 'mistral',
		author: 'mistral',
		icon: 'mistral.svg'
	},
	{
		name: 'Mistral',
		description: 'The latest Mistral model with a context length of 32k.',
		api: 'mistral',
		provider: 'ollama',
		author: 'mistral',
		parameters: '7b',
		icon: 'mistral.svg',
		size: 4.4
	},
	{
		name: 'Gemma 3',
		description: 'The current, most capable model that runs on a single GPU.',
		api: 'gemma3',
		parameters: '4b',
		provider: 'ollama',
		author: 'google',
		icon: 'gemma.svg',
		size: 3.3
	},
	{
		name: 'Gemma 3',
		description: 'The current, most capable model that runs on a single GPU.',
		api: 'gemma3',
		parameters: '1b',
		provider: 'ollama',
		author: 'google',
		icon: 'gemma.svg',
		size: 0.81
	},
	{
		name: 'Gemma 3',
		description: 'The current, most capable model that runs on a single GPU.',
		api: 'gemma3',
		parameters: '270m',
		provider: 'ollama',
		author: 'google',
		icon: 'gemma.svg',
		size: 0.29
	},

	{
		name: 'Llama 3.2',
		description: 'The latest Llama 3 model with a context length of 128k.',
		api: 'llama3.2',
		provider: 'ollama',
		author: 'meta',
		icon: 'meta.svg',
		parameters: '3b',
		size: 2
	},
	{
		name: 'Llama 3.2',
		description: 'The latest Llama 3 model with a context length of 128k.',
		api: 'llama3.2',
		provider: 'ollama',
		author: 'meta',
		icon: 'meta.svg',
		parameters: '1b',
		size: 1.3
	},
	{
		name: 'Llama 3.1',
		description:
			'Llama 3.1 is a new state-of-the-art model from Meta available in 8B, 70B and 405B parameter sizes.',
		api: 'llama3.1',
		provider: 'ollama',
		author: 'meta',
		icon: 'meta.svg',
		size: 4.9
	},
	{
		name: 'Codellama',
		description: 'Meta AI’s family of Llama 3 models, fine-tuned for coding tasks.',
		api: 'codellama',
		provider: 'ollama',
		author: 'meta',
		icon: 'meta.svg'
	},
	{
		name: 'Phi 4',
		description: 'Phi-4 is a 14B parameter, state-of-the-art open model from Microsoft.',
		api: 'phi4',
		provider: 'ollama',
		author: 'microsoft',
		icon: 'microsoft.svg',
		size: 9.1
	},
	{
		name: 'Qwen 3',
		description: 'The latest Qwen 3 model with a context length of 128k.',
		api: 'qwen3',
		provider: 'ollama',
		author: 'qwen',
		icon: 'qwen.svg',
		parameters: '8b',
		size: 5.2
	},
	{
		name: 'Qwen 3',
		description: 'The latest Qwen 3 model with a context length of 128k.',
		api: 'qwen3',
		provider: 'ollama',
		author: 'qwen',
		icon: 'qwen.svg',
		parameters: '4b',
		size: 2.5
	},
	{
		name: 'Qwen 2.5 Coder',
		description: 'The latest Qwen 2.5 model with a context length of 32k.',
		api: 'qwen2.5-coder',
		provider: 'ollama',
		author: 'qwen',
		icon: 'qwen.svg',
		parameters: '7b',
		size: 4.7
	},
	{
		name: 'Qwen 2.5 Coder',
		description: 'The latest Qwen 2.5 model with a context length of 32k.',
		api: 'qwen2.5-coder',
		provider: 'ollama',
		author: 'qwen',
		icon: 'qwen.svg',
		parameters: '3b',
		size: 1.9
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
