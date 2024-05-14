import { ollamaEmbedding } from '$lib/utils/ollamaClient';
import {newChromaVectorStore} from '$lib/utils/chromaClient';
import { CSVLoader } from 'langchain/document_loaders/fs/csv';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { DocxLoader } from 'langchain/document_loaders/fs/docx';
import { PPTXLoader } from 'langchain/document_loaders/fs/pptx';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const formData = await request.formData();
		const files = formData.getAll('files') as Blob[];
		const fileName = formData.get('fileName') as string;
		const image = formData.get('image') as string;
	
		ollamaEmbedding.model = image;

		const id = Math.random().toString(36).substring(7);

		const collectionName = 'collection-' + id;
		const vectorStore = newChromaVectorStore(ollamaEmbedding, collectionName);

		let collection = {
			name: collectionName as string,
			files: [] as any[]
		};
	
		await Promise.all(
			files.map(async (file) => {
				let loader = null;
				switch (file.type) {
					case 'application/pdf':
						loader = new PDFLoader(file, {
							splitPages: false
						});
						break;
					case 'text/csv':
						loader = new CSVLoader(file);
						break;
					case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
						loader = new DocxLoader(file);
						break;
					case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
						loader = new PPTXLoader(file);
						break;
					case 'text/plain':
						loader = new TextLoader(file);
						break;
					default:
						loader = null;
						break;
				}
				if (!loader) {
					return new Response(JSON.stringify({ error: 'Invalid file type', status: 400 }));
				}
				const doc = await loader.load();

				const splitter = new RecursiveCharacterTextSplitter({
					chunkSize: 333,
					chunkOverlap: 10
				});
			
				const chunkHeader = `FILE NAME: ${fileName.replace(/_|-|\.pdf/g, ' ')}`;
			
				const docChunk = await splitter.splitDocuments(doc, {
					chunkHeader,
					appendChunkOverlapHeader: true
				});

				const registeredChunk = await vectorStore.addDocuments(docChunk);

				console.log('registeredChunk', registeredChunk);
				
				collection.files.push({
					name: fileName,
					id: registeredChunk[0],
					type: file.type,
					chunks: registeredChunk.length
				})
			})
		);

		return new Response(
			JSON.stringify({
				message: 'Successfull embedding',
				collection,
				status: 200
			})
		);
	} catch (e) {
		console.log(e);
		return new Response(
			JSON.stringify({
				status: 500
			})
		);
	}
}
