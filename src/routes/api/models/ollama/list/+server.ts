import type { RequestHandler } from '@sveltejs/kit';
import ollama from 'ollama';

// Streams the progress of pulling an Ollama model. Body: { model: string }
export const POST: RequestHandler = async () => {
	try {
		const installedModels = await ollama.list();
		return new Response(JSON.stringify(installedModels), {
			status: 200,
			headers: { 'content-type': 'application/json' }
		});
	} catch (error) {
		console.error('Ollama list error', error);
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
			headers: { 'content-type': 'application/json' }
		});
	}
};
