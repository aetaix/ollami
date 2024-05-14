import { chroma } from '$lib/utils/chromaClient';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { name } = await request.json();

	await chroma.deleteCollection({ name });

	return new Response(JSON.stringify({ status: 200 }));
}
