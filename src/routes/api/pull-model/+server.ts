import { ollama } from "$lib/utils/ollamaClient";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    const { image } = await request.json();

    await startModelPull(image);

    return new Response(JSON.stringify({ message: "Model pull initiated" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to initiate model pull" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

async function startModelPull(image: string) {
  // Replace with your actual model pulling logic
  console.log("Pulling", image);

  const pulledModel = await ollama.pull({
    model: image,
    stream: true,
  });

  for await (const update of pulledModel) {
    switch (update.status) {
      case "success":
        console.log(update.status);
      default:
        let progress = Math.round((update.completed / update.total) * 100);
        process.stdout.write("Pulling model: " + progress + "%");
    }
  }
}
