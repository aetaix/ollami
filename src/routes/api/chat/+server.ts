import { ollamaAISDK } from '$lib/utils/ollamaClient';
import { streamText, StreamingTextResponse } from 'ai';
import { contextualCompression } from '$lib/utils/retrieval/contextualCompression.js';

const system = `You are a helpfull assistant answering the user queries, questions, and helping in their tasks. You always answer in the tongue of the user, and you are always polite and helpful. Sometimes the user will passe a <context /> tag that you can use the refine your answer and provide the most accurate information.`;

export async function POST({ request, fetch }) {
	const { messages, model, collectionName } = await request.json();

	const ollama = ollamaAISDK(model.image);

	if (collectionName.length > 0) {
		const lastMessage = messages[messages.length - 1];

		const prompt = await contextualCompression(
			lastMessage.content,
			messages,
			collectionName,
			model.image,
			fetch
		);
		console.log('prompt', prompt);
		lastMessage.content = prompt;
	}

	try {
		const result = await streamText({
			model: ollama,
			temperature: 0.75,
			system,
			messages
		});

		// Respond with the stream
		return new StreamingTextResponse(result.toAIStream());
	} catch (error) {
		console.error('Error:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
}
