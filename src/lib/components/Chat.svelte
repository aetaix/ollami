<script lang="ts">
	import { fly } from 'svelte/transition';
	import AssistantMessage from './chat-ui/assistantMessage.svelte';
	import Input from './chat-ui/input.svelte';
	import UserMessage from './chat-ui/userMessage.svelte';
	import { ChevronDown } from '@lucide/svelte';
	import { tick } from 'svelte';

	let { messages, input = $bindable(''), status, onsubmit } = $props();

	let messagesContainer: HTMLDivElement;
	let arrowDownVisible = $state(false);
	let autoScroll = $state(true); // whether we should stick to bottom during streaming

	const bottomThreshold = 4; // px tolerance to consider "at bottom"

	function isNearBottom() {
		if (!messagesContainer) return true;
		return (
			messagesContainer.scrollTop + messagesContainer.clientHeight >=
			messagesContainer.scrollHeight - bottomThreshold
		);
	}

	// Scroll helper
	async function scrollToBottom(behavior: ScrollBehavior = 'smooth') {
		if (!messagesContainer) return;
		await tick();
		messagesContainer.scrollTo({
			top: messagesContainer.scrollHeight,
			behavior
		});
	}

	// Auto scroll when messages  changes
	$effect(() => {
		const hasMessages = !!messages[messages.length - 1];
		if (!hasMessages) return;

		if (status === 'streaming' || status === 'submitted') {
			// Only auto-scroll while streaming if user hasn't scrolled up
			if (autoScroll) scrollToBottom();
		} else {
			// For non-streaming updates, keep behavior gated by autoScroll as well
			if (autoScroll) scrollToBottom('instant');
		}
	});

	const handleScroll = () => {
		if (!messagesContainer) return;
		const atBottom = isNearBottom();
		autoScroll = atBottom; // disable sticking to bottom when user scrolls up
		arrowDownVisible = !atBottom;
	};
</script>

<main class="relative flex h-screen w-full flex-col">
	<div
		bind:this={messagesContainer}
		class="overflow-y-auto"
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
	<div
		class="absolute right-0 bottom-0 left-0 flex justify-center bg-gradient-to-t from-white from-80% mask-x-from-90% mask-x-to-90% p-6 pt-0 dark:from-black"
	>
		{#if arrowDownVisible && status !== 'streaming' && status !== 'submitted'}
			<button
				in:fly={{ y: 24, duration: 200, delay: 300 }}
				out:fly={{ y: 24, duration: 200 }}
				onclick={() => scrollToBottom('smooth')}
				class="absolute -top-12 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white shadow transition-all hover:scale-110 dark:border-zinc-700 dark:bg-zinc-800"
				aria-label="Scroll to bottom"
			>
				<ChevronDown size={24} />
			</button>
		{/if}
		<Input bind:input {onsubmit} />
	</div>
</main>
