import { ollamaEmbedding } from '$lib/utils/ollamaClient';
import {newChromaVectorStore} from '$lib/utils/chromaClient';
import { CSVLoader } from 'langchain/document_loaders/fs/csv';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { DocxLoader } from 'langchain/document_loaders/fs/docx';
import { PPTXLoader } from 'langchain/document_loaders/fs/pptx';
import { TextLoader } from 'langchain/document_loaders/fs/text';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const formData = await request.formData();
		const files = formData.getAll('files') as Blob[];
		const image = formData.get('image') as string;
		const id = formData.get('id') as string | undefined;
		ollamaEmbedding.model = image;

		const collectionName = 'collection-' + id;
		const vectorStore = newChromaVectorStore(ollamaEmbedding, collectionName);

		let ids = [] as string[];

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
				const id = await vectorStore.addDocuments(doc);
				id.forEach((id) => {
					ids.push(id);
				});
			})
		);

		return new Response(
			JSON.stringify({
				message: 'Successfull embedding',
				ids,
				collection: collectionName,
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
