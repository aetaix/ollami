import { chroma } from "$lib/utils/chromaClient";

/** @type {import('./$types').PageLoad} */
export async function load() {
    const collections = await chroma.listCollections();
	return {
		collections
	};
}