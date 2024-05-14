import { ollamaLangChain, ollamaEmbedding } from '$lib/utils/ollamaClient';
import { existingChromaVectorStore } from '$lib/utils/chromaClient';
import { ContextualCompressionRetriever } from 'langchain/retrievers/contextual_compression';
import { LLMChainExtractor } from 'langchain/retrievers/document_compressors/chain_extract';

export const contextualCompression = async (
	query: string,
	messages: [{ role: string; content: string }],
	collection: string,
	model: string
) => {
	const llm = ollamaLangChain(model);
	const baseCompressor = LLMChainExtractor.fromLLM(llm);

	const vectorStore = await existingChromaVectorStore(ollamaEmbedding, 'collection-' + collection);

	const retriever = new ContextualCompressionRetriever({
		baseCompressor,
		baseRetriever: vectorStore.asRetriever()
	});

	const results = await retriever.invoke(query);

	console.log('results', results);

	// Clean the result by removing NO_OUTPUT and any string after
	results.forEach((result) => {
		const index = result.pageContent.indexOf('NO_OUTPUT');
		if (index !== -1) {
			result.pageContent = result.pageContent.slice(0, index);
		}
		result.pageContent = result.pageContent.replace(/[\n\r]+/g, ' ');
	});

	const prompt = `${query}. Use the following context to make your answer more accurate:
    --------
    <context>
    EXTRACTED CONTEXT:
    ${results.map((result) => result.pageContent).join('\n')}
    INFORMATIONS IN OUR CURRENT CONVERSATION:
    ${messages.slice(-5).map((message) => {return message.role + ':' + message.content}).join('\n')}
    </context>
	---------
    If you need more information, please ask me. Don't invent information, always provide accurate information.
    Answer the user's question in the most accurate way possible but don't mention where the information comes from.
    `;

	return prompt;
};
