<script lang="ts">
	import { page } from '$app/state';
	import { untrack } from 'svelte';
	import { Chat as SDKChat } from '@ai-sdk/svelte';
	import { chats, saveMessage, renameChat } from '$lib/stores/chatsStorage';
	import Chat from '$lib/components/Chat.svelte';

	let initialized = false;
	let input = $state('');
	let modelLoading = $state(false);
	let isError = $state(false);

	const chat = new SDKChat({
		get id() {
			return page.params.id;
		},
		onData: () => {
			modelLoading = false;
		},
		onFinish: (response) => {
			if (!page.params.id) return;
			saveMessage(response.message, page.params.id);
			if (chat.messages.length === 2) {
				renameChat(chat.messages, page.params.id);
			}
		},
		onError: (error) => {
			console.error(error);
			isError = true;
		}
	});

	$effect(() => {
		const id = page.params.id;
		const currentChat = untrack(() => $chats.find((chat) => chat.id === id));
		const localMessages = currentChat?.messages || [];

		if (!initialized && localMessages.length === 1) {
			initialized = true;

			if (localMessages.length === 1) {
				const firstMessage = localMessages[0];
				const firstPart = firstMessage.parts[0];

				if (firstPart.type === 'text') {
					modelLoading = true;
					const text = firstPart.text;

					chat.sendMessage(
						{ text },
						{
							body: {
								model: currentChat?.model
							}
						}
					);
				} else {
					console.warn('First message part is not of type text:', firstPart);
				}
			}
		} else {
			chat.messages = localMessages;
		}
	});

	function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!page.params.id) return;

		const currentChat = $chats.find((chat) => chat.id === page.params.id);

		saveMessage({ id: crypto.randomUUID(), role: 'user', parts: [{ type: 'text', text: input }] }, page.params.id);
		chat.sendMessage({ text: input }, { body: { model: currentChat?.model } });
	}
</script>

{#if isError}
	<div class="text-red-500">An error occurred. Please try again.</div>
{:else}
	<Chat messages={chat.messages} bind:input {onsubmit} />
{/if}
