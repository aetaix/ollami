import { createMistral } from '@ai-sdk/mistral';
import { MISTRAL_API_KEY } from '$env/static/private';

export const mistral = createMistral({
	apiKey: MISTRAL_API_KEY
});
