import { ChromaClient } from 'chromadb';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { type OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { env } from '$env/dynamic/private'

let url = env.CHROMA_API_URL || '';

export const chroma = new ChromaClient({
	path: url
});

export const newChromaVectorStore = (model: OllamaEmbeddings, name: string) => {
	return new Chroma(model, {
		collectionName: name,
		url
	});
};

export const existingChromaVectorStore = async (model: OllamaEmbeddings, name: string) => {
	return Chroma.fromExistingCollection(model, {
		collectionName: name,
		url
	});
};
