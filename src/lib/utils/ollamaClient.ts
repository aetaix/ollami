import { Ollama } from 'ollama'
const ollamaURL =
  process.env.VITE_APP_ENV === "dev"
    ? "http://127.0.0.1:11434"
    : "http://host.docker.internal:11434";


// Create a new Ollama instance accessible from the app.
export const ollama = new Ollama({ host: ollamaURL })

// Function to directly fetch the Ollama API
export async function fetchOllama(url: string, method: string, body: string) {
  const URL = ollamaURL + url;
  const request = fetch(URL, {
    method: method ? method : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? body : null,
  });

  const response = await request;
  return response.json();
}