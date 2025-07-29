import { Ollama } from 'ollama'; // JS Library
import { Ollama as OllamaLLM } from "@langchain/community/llms/ollama"; // Langchain
import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama'; // Langchain Embeddings
import { createOllama } from 'ollama-ai-provider'; // Vercel Provider
import { env } from '$env/dynamic/private'
import { URL } from 'url';

const baseURL = env.OLLAMA_API_URL || 'http://localhost:11434';

// Ollama JavaScript Library - https://github.com/ollama/ollama-js
export const ollamaJS = new Ollama({
	host: baseURL
});

// Ollama Vercel AI SDK Provider - https://github.com/sgomez/ollama-ai-provider
export const ollamaAISDK = createOllama({
	baseURL: new URL('/api', baseURL).href
});

// Ollama Langchain LLM - https://js.langchain.com/docs/integrations/llms/ollama 
export function ollamaLangChain(model: string, temperature?: number) {
	return new OllamaLLM({
		model,
		baseUrl: baseURL,
		temperature
	});
}

// Ollama Langchain Embeddings Class - https://js.langchain.com/docs/integrations/text_embedding/ollama
export const ollamaEmbedding = new OllamaEmbeddings({
	model: 'nomic-embed-text:latest', // default value
	baseUrl: baseURL // default value
});