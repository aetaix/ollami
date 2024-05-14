import { ollamaAISDK } from "$lib/utils/ollamaClient";
import { generateText } from 'ai';


/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { image, messages } = await request.json();

  const model = ollamaAISDK(image);

  const { text } = await generateText({
    model,
    prompt: `Capture the main topic, idea, or subject of the following chat and use it to generate a short title for organizing my historic of chat. 
    You only return the title as a string, never use formating. 
    The chat's messages: ${JSON.stringify(messages)}.
    Return title:
    `,
  });
  return new Response(JSON.stringify(text), { status: 200 });
}
