import { writeFile } from 'node:fs/promises';

export const POST = async ({ request }) => {
	const formData = await request.formData();
	const background = formData.get('background') as File;

	console.log('Received background file:', background);

	if (!background) {
		return new Response(JSON.stringify({ error: 'No background file provided' }), { status: 400 });
	}

	if (!background.type.startsWith('image/')) {
		return new Response(JSON.stringify({ error: 'Invalid file type. Please upload an image.' }), {
			status: 400
		});
	}

	const filePath = `backgrounds/${background.name}`;
	const arrayBuffer = await background.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	// Use async writeFile instead
	await writeFile(`static/${filePath}`, buffer);

	return new Response(JSON.stringify({ path: `/${filePath}` }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
