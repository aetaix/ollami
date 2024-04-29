import { embeddings } from "$lib/utils/ollamaClient";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Chroma } from "@langchain/community/vectorstores/chroma";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const formData = await request.formData();
  const file = formData.get("file") as Blob;
  const image = formData.get("image") as string;
  const id = formData.get("id") as string | undefined;
  embeddings.model = image;
  let loader = null;

  console.log(file);

  switch (file.type) {
    case "application/pdf":
      loader = new PDFLoader(file, {
        splitPages: false,
      });

      break;
    case "text/csv":
      loader = new CSVLoader(file);
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
    url: "http://localhost:8000", // Optional, will default to this value
  });

// Also supports an additional {ids: []} parameter for upsertion
  const ids = await vectorStore.addDocuments(docs);

  console.log(ids)

  /*
  await Chroma.fromDocuments(docs, embeddings, {
    collectionName,
    url: "http://localhost:8000", // Optional, will default to this value
    collectionMetadata: {
      "hnsw:space": "cosine",
      "documentName": file.name,
      "documentType": file.type,
    }, // Optional, can be used to specify the distance method of the embedding space https://docs.trychroma.com/usage-guide#changing-the-distance-function
  });*/

  return new Response(
    JSON.stringify({
      message: "Successfull embedding",
      ids,
      collection: collectionName,
      status: 200,
    })
  );
}
