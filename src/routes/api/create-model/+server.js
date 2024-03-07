import ollama from "ollama";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { model, prompt, name } = await request.json();
  const modelfile = `
FROM ${model}
SYSTEM "${prompt}"
`;
  const newModel = await ollama.create({
    model: name,
    modelfile: modelfile,
  });

  return new Response(JSON.stringify(newModel), { status: 200 });
}
