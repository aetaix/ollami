import { ChromaClient } from "chromadb";

const url =
  process.env.VITE_APP_ENV === "dev"
    ? "http://localhost:8000"
    : "http://host.docker.internal:8000";

export const chroma = new ChromaClient({
  path: url,
});