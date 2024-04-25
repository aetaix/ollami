import ollama from "ollama";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { image, messages } = await request.json();

  const response = await ollama.generate({
    model: image,
    prompt: `Capture the main topic, idea, or subject of the following chat and use it to generate a short title for organizing my historic of chat. 
    You only return the title as a string, never use formating. 
    The chat's messages: ${JSON.stringify(messages)}.
    Return title:
    `,
  });
  return new Response(JSON.stringify(response.response), { status: 200 });
}
