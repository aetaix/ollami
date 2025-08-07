import { generateText, generateObject, convertToModelMessages, type UIMessage } from 'ai';
import { Provider } from '$lib/server/modelClients';
import { renamePrompt as system } from '$lib/stores/prompts.svelte.js';
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

	const prompt = `
    Generate a short conversation name based on the user first message. Propose only something short and descriptive.
	Format the response as a string, no "" or '' around the name.
	The User message: ${userMessageText.trim()}.
`;

	const client = Provider('mistral');

	const { text } = await generateText({
		model: client('mistral-small-latest'),
		prompt
	});

	// const { object } = await generateObject({
	// 	model: client('mistral-small-latest'),
	// 	output: 'object',
	// 	schemaName: 'name',
	// 	schema: z.object({
	// 		name: z.string()
	// 	}),
	// 	prompt
	// });

	return new Response(JSON.stringify({ name: text }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
