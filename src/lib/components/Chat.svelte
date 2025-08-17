<script lang="ts">
	import { fly } from 'svelte/transition';
	import AssistantMessage from './chat-ui/assistantMessage.svelte';
	import Input from './chat-ui/input.svelte';
	import UserMessage from './chat-ui/userMessage.svelte';
	import { ChevronDown } from '@lucide/svelte';
	import { tick } from 'svelte';

	let { messages, input = $bindable(''), onsubmit } = $props();

	let messagesContainer: HTMLDivElement;
	let arrowDownVisible = $state(false);

	// Scroll helper
	async function scrollToBottom() {
		if (!messagesContainer) return;
		await tick();
		messagesContainer.scrollTo({
			top: messagesContainer.scrollHeight,
			behavior: 'smooth'
		});
	}

	// Auto scroll when messages  changes
	$effect(() => {
		if (messages[messages.length - 1]) {
			scrollToBottom();
		}
	});

	const handleScroll = () => {
		if (!messagesContainer) return;
		arrowDownVisible =
			messagesContainer.scrollTop + messagesContainer.clientHeight < messagesContainer.scrollHeight;
	};
</script>

<main class="relative flex h-screen w-full flex-col">
	<div
		bind:this={messagesContainer}
		class="overflow-y-auto mask-b-from-85% mask-b-to-90%"
		onscroll={handleScroll}
		role="log"
		aria-live="polite"
		aria-label="Chat messages"
	>
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
		{#if arrowDownVisible}
			<button
				in:fly={{ y: 24, duration: 200, delay: 400 }}
				out:fly={{ y: 24, duration: 200 }}
				onclick={scrollToBottom}
				class="absolute -top-8 z-10 flex h-10 w-10 justify-center items-center rounded-full bg-white shadow border border-zinc-200 dark:border-zinc-700 transition-all hover:scale-110 dark:bg-zinc-800"
				aria-label="Scroll to bottom"
			>
				<ChevronDown size={24} />
			</button>
		{/if}
		<Input bind:input {onsubmit} />
	</div>
</main>
