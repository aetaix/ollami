import type { RequestHandler } from '@sveltejs/kit';
import ollama from 'ollama';

// Streams the progress of pulling an Ollama model. Body: { model: string }
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { model } = (await request.json()) as { model?: string };
		if (!model) {
			return new Response(JSON.stringify({ error: 'Missing model' }), {
				status: 400,
				headers: { 'content-type': 'application/json' }
			});
		}

		const stream = await ollama.pull({ model, stream: true });

		// Create a ReadableStream that forwards NDJSON-like chunks
		const encoder = new TextEncoder();
		const readable = new ReadableStream<Uint8Array>({
			async start(controller) {
				try {
					for await (const part of stream as any) {
						controller.enqueue(encoder.encode(`${JSON.stringify(part)}\n`));
					}
					controller.close();
				} catch (err) {
					controller.error(err);
				}
			}
		});

		return new Response(readable, {
			headers: {
				'content-type': 'application/x-ndjson; charset=utf-8',
				'cache-control': 'no-store'
			}
		});
	} catch (error) {
		console.error('Ollama pull error', error);
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
			headers: { 'content-type': 'application/json' }
		});
	}
};
