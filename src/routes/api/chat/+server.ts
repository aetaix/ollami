import { Provider } from '$lib/server/modelClients';
import { streamText, type UIMessage, convertToModelMessages } from 'ai';
import { system } from '$lib/stores/prompts.svelte.js';
import { type Model } from '$lib/stores/models.svelte.js';

export async function POST({ request }) {
	const { messages, model }: { messages: UIMessage[]; model: Model } = await request.json();

	const client = Provider(model.provider);

	const result = streamText({
		model: client(model.api),
		messages: convertToModelMessages(messages),
		system
	});

	return result.toUIMessageStreamResponse();
}
