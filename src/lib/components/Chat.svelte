<script lang="ts">
	import AssistantMessage from './chat-ui/assistantMessage.svelte';
	import Input from './chat-ui/input.svelte';
	import UserMessage from './chat-ui/userMessage.svelte';
	import { tick } from 'svelte';

	let { messages, input = $bindable(''), onsubmit } = $props();

	let messagesContainer: HTMLDivElement;

	// Scroll helper
	async function scrollToBottom() {
		if (!messagesContainer) return;
		await tick();
		messagesContainer.scrollTo({
			top: messagesContainer.scrollHeight,
			behavior: 'instant'
		});
	}

	// Auto scroll when messages length changes
	$effect(() => {
		if (messages?.length) scrollToBottom();
	});
</script>

<main class="relative flex h-screen w-full flex-col">
	<div bind:this={messagesContainer} class="h-full overflow-y-auto mask-b-from-85% mask-b-to-90%" role="log" aria-live="polite" aria-label="Chat messages">
		<ul class="mx-auto max-w-2xl pt-20 pb-32">
			{#each messages as message, messageIndex (messageIndex)}
				{#if message.role === 'user'}
					<UserMessage {message} />
				{:else if message.role === 'assistant'}
					<AssistantMessage {message} />
				{/if}
			{/each}
		</ul>
	</div>
	<div class="absolute right-0 bottom-0 left-0 flex justify-center p-6">
		<Input bind:input {onsubmit} />
	</div>
</main>
