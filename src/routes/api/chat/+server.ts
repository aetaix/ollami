import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { BytesOutputParser } from "@langchain/core/output_parsers";
import { type Message as VercelChatMessage, StreamingTextResponse } from "ai";
import type { RequestHandler } from "./$types";

const formatMessage = (message: VercelChatMessage) => {
  return [message.role, message.content];
};

const sanitizeContent = (content: string): string => {
  return content.replace(/{/g, "\\{").replace(/}/g, "\\}").replace(/`/g, "\\`").replace(/\$/g, '\\$');
};

export const POST = (async ({ request }) => {
  const { messages, model } = await request.json();

  // Directly modify each message's content
  messages.forEach((message: { content: string }) => {
    message.content = sanitizeContent(message.content);
  });

  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;

  const prompt = ChatPromptTemplate.fromMessages([
    ...formattedPreviousMessages,
    ["user", "{input}"],
  ]);

  const chat = new ChatOllama({
    model: model.image,
    baseUrl: "http://localhost:11434",
  });

  const outputParser = new BytesOutputParser();

  const chain = prompt.pipe(chat).pipe(outputParser);

  const stream = await chain.stream({
    input: currentMessageContent,
  });
  return new StreamingTextResponse(stream);
}) satisfies RequestHandler;
