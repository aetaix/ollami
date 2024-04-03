import { WebSocketServer } from "ws";
import { getProgress } from "./modelPuller";

const wss = new WebSocketServer({ port: 8080 });

wss.on("listening", () => {
  console.log("WebSocket Server is running on port 8080");
});

export const clients = new Set<WebSocket>();

wss.on("connection", (ws: WebSocket) => {
  clients.add(ws);

  ws.on("message", (message: string) => {
    const data = JSON.parse(message);
    if (data.type === "requestProgress") {
      const progress = getProgress(data.modelImage);
      ws.send(JSON.stringify({ type: "currentProgress", progress }));
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});

export function sendProgressUpdate(progress: number) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "progress", progress }));
    }
  });
}

export default wss;
