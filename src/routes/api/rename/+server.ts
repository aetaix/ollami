import { generateText, convertToModelMessages, type UIMessage } from 'ai';
import { Provider } from '$lib/server/modelClients';
import { renamePrompt as system } from '$lib/stores/prompts.svelte.js';

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
    User message: ${userMessageText}
`;

	const client = Provider('mistral');

	const { text } = await generateText({
		model: client('mistral-small-latest'),
		prompt,
		system
	});

	return new Response(JSON.stringify({ name: text }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
