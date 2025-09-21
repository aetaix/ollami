import type { RequestHandler } from '@sveltejs/kit';
import ollama from 'ollama';
export const POST: RequestHandler = async ({ request }) => {
	const { model }: { model: App.Model } = await request.json();

	await ollama.delete({ model: model.api });

	return new Response(JSON.stringify({ success: true }), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
};
