import { ollamaEmbedding } from '$lib/utils/ollamaClient';
import { existingChromaVectorStore } from '$lib/utils/chromaClient';

export const naiveRAG = async (message: string, collection: string) => {
	const vectorStore = await existingChromaVectorStore(
		ollamaEmbedding,
		'collection-' + collection
	);

	const retriever = vectorStore.asRetriever(3);
	const results = await retriever.invoke(message);

	const prompt = `Your are a helpfull assistant answering the user query. To better anser you can use an extracted set of informations from the document. Here is the extracted information from the document:
    --------
    <document>
    ${JSON.stringify(results)}
    </document>
	---------
	<query>
    ${message}
    </query>
    `;
	return prompt;
};
