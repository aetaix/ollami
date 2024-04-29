import Ollama from "openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { embeddings } from "$lib/utils/ollamaClient";
import { OpenAIStream as OllamaStream, StreamingTextResponse } from "ai";

const url =
  process.env.VITE_APP_ENV === "dev"
    ? "http://127.0.0.1:11434"
    : "http://host.docker.internal:11434";

const ollama = new Ollama({
  baseURL: url + "/v1",
  apiKey: "IGNORED",
});

export async function POST({ request }) {
  const { messages, model, rag } = await request.json();

  if (rag.state) {
   
    const vectorStore = await Chroma.fromExistingCollection(embeddings, {
      collectionName: "collection-" + rag.collection,
    });

    // get last message
    const lastMessage = messages[messages.length - 1];

    //const response = await vectorStore.similaritySearch(lastMessage.content);

    const retriever = vectorStore.asRetriever(3);
    const results = await retriever.invoke(lastMessage.content);

    const prompt = `Your are a helpfull assistant answering the user query. To better anser you will use a extracted set of documents:
      <query>
      ${lastMessage.content}
      </query>
      --------
      <document>
      ${JSON.stringify(results)}
      </document>
      `;
    // update message system message with the new syste
    lastMessage.content = prompt;
  }

  try {
    const response = await ollama.chat.completions.create({
      model: model.image,
      stream: true,
      temperature: 0.63,
      messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OllamaStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error:", error);
  }
}
