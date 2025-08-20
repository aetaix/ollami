export const staticOllamaModels: App.Model[] = [
	{
		name: 'Gemma 3',
		description: 'The current, most capable model that runs on a single GPU.',
		api: 'gemma3:4b',
		provider: 'ollama'
	},
	{
		name: 'Gemma 3 270M',
		description: 'The current, most capable model that runs on a single GPU.',
		api: 'gemma3:270m',
		provider: 'ollama'
	},
	{
		name: 'Qwen 3',
		description: 'The latest Qwen 3 model with a context length of 128k.',
		api: 'qwen3:latest',
		provider: 'ollama'
	},
	{
		name: 'Llama 3.2',
		description: 'The latest Llama 3 model with a context length of 128k.',
		api: 'llama3.2:latest',
		provider: 'ollama'
	},
	{
		name: 'Mistral 7b',
		description: 'The latest Mistral model with a context length of 32k.',
		api: 'mistral:latest',
		provider: 'ollama'
	}
];

// Expose curated Ollama models. Filtering to locally-available ones is handled server-side when needed.
export const ollamaModels = staticOllamaModels;
