import Ollama from "openai";
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
  const { messages, model } = await request.json();
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
