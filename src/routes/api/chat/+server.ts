import { Provider } from '$lib/server/modelClients';
import {
	streamText,
	type ModelMessage,
	type UIMessage,
	convertToModelMessages,
	extractReasoningMiddleware,
	wrapLanguageModel
} from 'ai';
import { SYSTEM_PROMPT, REASONING_SYSTEM_PROMPT } from '$lib/prompts/system';
import type { RequestHandler } from '@sveltejs/kit';
import type { Companion } from '$lib/stores/companionsStorage';

// Define expected request body shape
interface ChatRequestBody {
	messages: UIMessage[];
	model: App.Model;
	companion?: Companion;
}

// Define possible error responses
const ERROR_RESPONSES = {
	INVALID_BODY: {
		status: 400,
		body: { error: 'Invalid request body' }
	},
	MODEL_ERROR: {
		status: 400,
		body: { error: 'Invalid model configuration' }
	},
	INTERNAL_ERROR: {
		status: 500,
		body: { error: 'Internal Server Error' }
	}
} as const;

export const POST: RequestHandler = async ({ request }) => {
	try {
		// 1. Parse and validate request body
		const { messages, model, companion }: ChatRequestBody = await request.json();
		if (!messages || !model) return createErrorResponse(ERROR_RESPONSES.INVALID_BODY);

		// 2. Initialize model client
		const client = Provider(model.provider);
		if (!client) return createErrorResponse(ERROR_RESPONSES.MODEL_ERROR);

		// 3. Prepare system prompt
		let system = SYSTEM_PROMPT;
		if (companion?.system) {
			// we replace the whole system prompt if the companion has one, so the user can have a full control
			system = companion.system;
		}

		if (model.reasoning) {
			system = system + '\n' + REASONING_SYSTEM_PROMPT;
		}

		console.log('Using system prompt:', system);

		// 4. Prepare common stream configuration
		const commonConfig = {
			messages: convertToModelMessages(messages),
			system
		};

		const api =
			model.provider === 'ollama'
				? model.parameters
					? model.api + ':' + model.parameters
					: model.api + ':latest'
				: model.api;

		// 4. Handle reasoning vs normal flow
		const result = model.reasoning
			? await createReasoningStream(client, api, commonConfig)
			: await createNormalStream(client, api, commonConfig);

		return result.toUIMessageStreamResponse();
	} catch (error) {
		console.error('Chat API error:', error);
		return createErrorResponse(ERROR_RESPONSES.INTERNAL_ERROR);
	}
};

// Helper functions
async function createReasoningStream(
	client: any,
	apiKey: string,
	config: { messages: ModelMessage[]; system: string }
) {
	return streamText({
		model: wrapLanguageModel({
			model: client(apiKey),
			middleware: extractReasoningMiddleware({ tagName: 'think' })
		}),
		...config
	});
}

async function createNormalStream(
	client: any,
	apiKey: string,
	config: { messages: ModelMessage[]; system: string }
) {
	return streamText({
		model: client(apiKey),
		...config
	});
}

function createErrorResponse(response: (typeof ERROR_RESPONSES)[keyof typeof ERROR_RESPONSES]) {
	return new Response(JSON.stringify(response.body), {
		status: response.status,
		headers: { 'Content-Type': 'application/json' }
	});
}
