import { Provider } from '$lib/server/modelClients';
import { streamText } from 'ai';

export async function POST({ request }) {
	const { model, prompt }: { model: App.Model; prompt: string } = await request.json();

	try {
		const client = Provider(model.provider);

		const result = streamText({
			model: client(model.api),
			prompt
		});

		return result.toUIMessageStreamResponse();
	} catch (error) {
		console.error('Error in POST /api/chat:', error);
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
