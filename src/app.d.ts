// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Model {
			name: string;
			description: string;
			api: string;
			provider: 'ollama' | 'openai' | 'mistral';
			version?: string;
		}
	}
}

export {};
