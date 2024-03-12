import ollama from "ollama";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { model } = await request.json();

  console.log("Pulling model", model.image);

  const pulledModel = await ollama.pull({
    model: model.image,
    stream: true,
  });

  // pullModel is an async generator, get loading updates

  for await (const update of pulledModel) {
    if (update.status === "success") {
      const response = new Response(JSON.stringify(pulledModel), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } else {
      let progress = Math.round((update.completed / update.total) * 100);
      process.stdout.write("Pulling model: " + progress);
    }
  }
}
