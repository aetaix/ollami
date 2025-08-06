import { mistral } from '$lib/server/mistralClient';
import { streamText, type UIMessage, convertToModelMessages } from 'ai';
import { system } from '$lib/stores/prompts.svelte.js';
import { type Model } from '$lib/stores/models.svelte.js';

export async function POST({ request }) {
	const { messages, model }: { messages: UIMessage[]; model: Model } = await request.json();

	const result = streamText({
		model: mistral(model.api),
		messages: convertToModelMessages(messages),
		system
	});

	return result.toUIMessageStreamResponse();
}
