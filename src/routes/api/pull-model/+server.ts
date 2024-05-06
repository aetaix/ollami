import { ollama } from '$lib/utils/ollamaClient';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const { image } = await request.json();

		console.log('Pulling', image);

		const pulledModel = await ollama.pull({
			model: image,
			stream: true
		});

		for await (const chunk of pulledModel) {
			console.log('Chunk', chunk);
		}
	
		const stream = new ReadableStream({
			async start(controller) {
				for await (const chunk of pulledModel) {
					controller.enqueue(chunk);
				}
				controller.close();
			}
		});

		return new Response(stream, {
			status: 200,
			headers: {
				'Content-Type': 'application/octet-stream'
			}
		});

	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to initiate model pull' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
