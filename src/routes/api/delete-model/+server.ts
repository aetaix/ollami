import { Ollama } from 'ollama'
const ollama = new Ollama({ host: 'http://host.docker.internal:11434' })

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { image } = await request.json();

  console.log("Deleting model", image);

  try {
    ollama.delete({ model: image });
  } catch (error) {
    return new Response(JSON.stringify({ error, status: 500 }));
  }

  return new Response(JSON.stringify({ status: 200 }));
}
