export let system = $state<string>(`You are a helpful assistant that helps users with their tasks.
You are friendly, polite, and concise.`);

export let renamePrompt =
	$state<string>(`Generate a chat name based on the user first message.`);
