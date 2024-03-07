import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { BytesOutputParser } from "langchain/schema/output_parser";
import { type Message as VercelChatMessage, StreamingTextResponse } from "ai";
import type { RequestHandler } from "./$types";

const formatMessage = (message: VercelChatMessage) => {
  return [message.role , message.content];
};

export const POST = (async ({ request }) => {
  const { messages, currentModel } = await request.json();

  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;

  console.log(currentModel)
  
  const prompt = ChatPromptTemplate.fromMessages([
    ...formattedPreviousMessages,
    ["user", "{input}"],
  ]);

  const model = new ChatOllama({
    model: currentModel.image,
  });

  const outputParser = new BytesOutputParser();

  const chain = prompt.pipe(model).pipe(outputParser);

  const stream = await chain.stream({
    input: currentMessageContent,
  });
  return new StreamingTextResponse(stream);
}) satisfies RequestHandler;
