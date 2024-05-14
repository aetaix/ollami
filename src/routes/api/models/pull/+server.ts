import { ollamaJS } from '$lib/utils/ollamaClient';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const { image } = await request.json();

		console.log('Pulling', image);

		// const pulledModel: AsyncGenerator<ProgressResponse, any, unknown>
		const pulledModel = await ollamaJS.pull({
			model: image,
			stream: true
		});

		let progress = 0;

		for await (const chunk of pulledModel) {
			const total = chunk.total;
			const completed = chunk.completed;
			progress = (completed / total) * 100;
			//process.stdout.write(`\r${progress.toFixed(2)}%`);
			// showPercentage(`${progress.toFixed(2)}%`);
			if ( progress < 100) {
				console.log(`${progress.toFixed(2)}%`);
			}
	
		}
		
		const stream = new ReadableStream({
			async start(controller) {
				while (pulledModel.next()) {
					controller.enqueue(progress);
					await pulledModel.next();
				}
			}
		});

		return new Response(
			JSON.stringify({
				status: 200
			})
		);
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to initiate model pull' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}

