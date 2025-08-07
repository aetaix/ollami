import { createOllama } from 'ollama-ai-provider';
import { createMistral } from '@ai-sdk/mistral';
import { createOpenAI } from '@ai-sdk/openai';

import { MISTRAL_API_KEY, OPENAI_API_KEY } from '$env/static/private';

const mistral = createMistral({
	apiKey: MISTRAL_API_KEY || ''
});

const openai = createOpenAI({
	apiKey: OPENAI_API_KEY || ''
});

const ollama = createOllama();

export const Provider = (provider: string) => {
	if (provider === 'mistral') {
		return mistral;
	} else if (provider === 'openai') {
		return openai;
	} else if (provider === 'ollama') {
		return ollama;
	} else {
		throw new Error('Invalid provider');
	}
};
