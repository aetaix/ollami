import { ChromaClient } from "chromadb";
const client = new ChromaClient({
  path: "http://localhost:8000",
});

/** @type {import('./$types').PageLoad} */
export async function load() {
    const collections = await client.listCollections();
	return {
		collections
	};
}