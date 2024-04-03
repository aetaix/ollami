import { startModelPull } from "$lib/websocket/modelPuller";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    const { model } = await request.json();

    startModelPull(model);

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
