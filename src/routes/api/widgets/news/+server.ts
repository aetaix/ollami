import { Provider } from '$lib/server/modelClients';
import { streamText } from 'ai';
import { NEWS_API_KEY } from '$env/static/private';

export async function POST({ request }) {
	const { model, countryCode }: { model: App.Model; countryCode: string } = await request.json();
	console.log(model, countryCode);
	// GET https://newsapi.org/v2/top-headlines?country=us&apiKey=a97c79e9fc3a460cab028663d25a130b

	const getNews = await fetch(
		`https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=${NEWS_API_KEY}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	const newsData = await getNews.json();

	console.log(newsData);

	const prompt = `Summarize the following news articles:\n${newsData.articles.map((article: any) => `- ${article.title}`).join('\n')}`;

	try {
		const client = Provider(model.provider);

		const result = streamText({
			model: client(model.api),
			prompt
		});

		return result.toUIMessageStreamResponse();
	} catch (error) {
		console.error('Error in POST /api/chat:', error);
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
