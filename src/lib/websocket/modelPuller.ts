import { sendProgressUpdate } from "./websocket";
import ollama from "ollama";

const modelProgress = new Map<string, number>();

export async function startModelPull(model: object) {
  // Replace with your actual model pulling logic
  console.log("Pulling", model.image);

  const pulledModel = await ollama.pull({
    model: model.image,
    stream: true,
  });

  for await (const update of pulledModel) {
    switch (update.status) {
      case "success":
        console.log(update.status);
        sendProgressUpdate(100);
      default:
        let progress = Math.round((update.completed / update.total) * 100);
        //process.stdout.write("Pulling model: " + progress + "%");
        modelProgress.set(model.image, progress);
        sendProgressUpdate(progress);
    }
  }
}

export function getProgress(modelImage: string) {
  return modelProgress.get(modelImage) || 0;
}