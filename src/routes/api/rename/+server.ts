import { generateObject, convertToModelMessages, type UIMessage } from 'ai';
import { Provider } from '$lib/server/modelClients';
// import { renamePrompt as system } from '$lib/stores/prompts.svelte.js';
import { RENAME_PROMPT } from '$lib/prompts/rename.js';
import { z } from 'zod';

export async function POST({ request }) {
	const { messages }: { messages: UIMessage[] } = await request.json();

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
	const client = Provider('openai');

	const { object } = await generateObject({
		model: client('gpt-5-nano'),
		schema: z.object({
			name: z.string()
		}),
		system: RENAME_PROMPT,
		prompt
	});

	return new Response(JSON.stringify({ name: object.name }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
