import { ollama } from "$lib/utils/ollamaClient";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { model, system, name } = await request.json();

  const modelFile = `FROM ${model}\nSYSTEM "${system}"\n`;

  await ollama.create({ model: name, modelfile: modelFile });
  
  console.log("Companion created");

  const companion = await ollama.show({model});
  console.log(companion)

  return new Response(JSON.stringify({ status: 200, companion }));
}
