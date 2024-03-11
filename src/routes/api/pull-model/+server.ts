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
    console.log("Pulled model update", update);
  }

  // return the stream to front to display loading updates and indicate progress

  return new ReadableStream({   
    async start(controller) {
      for await (const update of pulledModel) {
        controller.enqueue(JSON.stringify(update));
      }
      controller.close();
    }
  }, { type: "application/json" });

  // return new Response(JSON.stringify(pulledModel), { status: 200 });
}
