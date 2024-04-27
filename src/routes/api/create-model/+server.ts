import { Ollama } from 'ollama'
const ollama = new Ollama({ host: 'http://host.docker.internal:11434' })

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { model, system, name } = await request.json();

  const modelFile = `FROM ${model}\nSYSTEM "${system}"\n`;

  await ollama.create({ model: name, modelfile: modelFile });
  
  console.log("Model created");

  return new Response(JSON.stringify(name), { status: 200 });
}
