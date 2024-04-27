const ollamaURL =
  process.env.VITE_APP_ENV === "dev"
    ? "http://127.0.0.1:11434"
    : "http://host.docker.internal:11434";

export async function fetchAPI(url: string, method: string, body: string) {
  const URL = ollamaURL + url;
  const request = fetch(URL, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body
  });

  const response = await request;
  return response.json();
}
