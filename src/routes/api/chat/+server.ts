import { ollamaAISDK } from '$lib/utils/ollamaClient';
import { streamText, StreamingTextResponse } from 'ai';
import { naiveRAG } from './retrieval/naiveRAG';

export async function POST({ request }) {
	const { messages, model, rag } = await request.json();

	const ollama = ollamaAISDK(model.image);

	if (rag.state) {
		const lastMessage = messages[messages.length - 1];
		const prompt = await naiveRAG(lastMessage, rag);
		lastMessage.message = prompt;
	}

	try {
		const result = await streamText({
			model: ollama,
			temperature: 0.63,
			messages
		});

		// Respond with the stream
		return new StreamingTextResponse(result.toAIStream());
	} catch (error) {
		console.error('Error:', error);
	}
}
