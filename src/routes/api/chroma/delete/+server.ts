import { ChromaClient } from "chromadb";
const client = new ChromaClient({
  path: "http://localhost:8000",
});
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { id, name } = await request.json();

  //await client.deleteCollection({name: name})
  let collection = await client.getCollection({
    name: name,
  });
  await collection.delete({
    ids: [id], //ids
  });

  return new Response(JSON.stringify({ status: 200 }));
}
