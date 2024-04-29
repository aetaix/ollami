import { ChromaClient } from "chromadb";
const client = new ChromaClient({
  path: "http://localhost:8000",
});
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { name } = await request.json();

  console.log(name)

await client.deleteCollection({name: name}) 

  return new Response(JSON.stringify({ status: 200 }));
}
