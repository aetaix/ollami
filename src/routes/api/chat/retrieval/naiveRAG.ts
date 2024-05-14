import { ollamaEmbedding } from '$lib/utils/ollamaClient';
import { existingChromaVectorStore } from '$lib/utils/chromaClient';

export const naiveRAG = async (message: {content: string}, rag: {collection: string}) => {
	const vectorStore = await existingChromaVectorStore(
		ollamaEmbedding,
		'collection-' + rag.collection
	);

	// get last message
	

	//const response = await vectorStore.similaritySearch(lastMessage.content);

	const retriever = vectorStore.asRetriever(3);
	const results = await retriever.invoke(message.content);

	const prompt = `Your are a helpfull assistant answering the user query. To better anser you will use a extracted set of documents:
    <query>
    ${message.content}
    </query>
    --------
    <document>
    ${JSON.stringify(results)}
    </document>
    `;
	// update message system message with the new syste
	return prompt;
};
