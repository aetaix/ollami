import { embeddings } from "$lib/utils/ollamaClient";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { PPTXLoader } from "langchain/document_loaders/fs/pptx";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { Chroma } from "@langchain/community/vectorstores/chroma";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const formData = await request.formData();
  const file = formData.get("file") as Blob;
  const image = formData.get("image") as string;
  const id = formData.get("id") as string | undefined;
  embeddings.model = image;
  let loader = null;

  switch (file.type) {
    case "application/pdf":
      loader = new PDFLoader(file, {
        splitPages: false,
      });
      break;
    case "text/csv":
      loader = new CSVLoader(file);
      break;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      loader = new DocxLoader(file);
      break;
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      loader = new PPTXLoader(file);
      break;
    case "text/plain":
      loader = new TextLoader(file);
      break;
    default:
      loader = null;
      break;
  }
  if (!loader) {
    return new Response(
      JSON.stringify({ error: "Invalid file type", status: 400 })
    );
  }
  const docs = await loader.load();

  const collectionName = "collection-" + id;

  const vectorStore = new Chroma(embeddings, {
    collectionName,
    url: "http://localhost:8000"
  });

  // Also supports an additional {ids: []} parameter for upsertion
  const ids = await vectorStore.addDocuments(docs);

  return new Response(
    JSON.stringify({
      message: "Successfull embedding",
      ids,
      collection: collectionName,
      status: 200,
    })
  );
}
