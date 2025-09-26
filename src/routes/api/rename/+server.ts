import { generateObject, convertToModelMessages, type UIMessage } from 'ai';
import { Provider } from '$lib/server/modelClients';
// import { renamePrompt as system } from '$lib/stores/prompts.svelte.js';
import { RENAME_PROMPT } from '$lib/prompts/rename.js';
import { z } from 'zod';

export async function POST({ request }) {
	const { messages, model }: { messages: UIMessage[]; model: App.Model } = await request.json();

	const convertedMessages = convertToModelMessages(messages);

	const firstContentItem = convertedMessages[0].content[0];

	let userMessageText = '';

	if (typeof firstContentItem === 'string') {
		userMessageText = firstContentItem;
	} else if ('text' in firstContentItem) {
		// This is a TextPart
		userMessageText = firstContentItem.text;
	} else {
		// Handle other part types or provide a default
		userMessageText = 'Non-text content';
	}

	const prompt = `The user initial message: ${userMessageText.trim()}.`;
	const client = Provider(model.provider);
	if (!client) {
		return new Response(JSON.stringify({ error: 'Model provider not found' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}
	const api =
		model.provider === 'ollama'
			? model.parameters
				? model.api + ':' + model.parameters
				: model.api + ':latest'
			: model.api;

	const { object } = await generateObject({
		model: client(api),
		schema: z.object({
			conversation_title: z.string()
		}),
		system: RENAME_PROMPT,
		prompt
	});

	return new Response(JSON.stringify({ name: object.conversation_title }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
