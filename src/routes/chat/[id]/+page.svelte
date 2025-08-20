<script lang="ts">
	import { page } from '$app/state';
	import { Chat as SDKChat } from '@ai-sdk/svelte';
	import { chats, saveMessage, renameChat } from '$lib/stores/chatsStorage';
	import Chat from '$lib/components/Chat.svelte';

	let currentChat = $derived($chats.find((chat) => chat.id === page.params.id));
	let initialized = false;
	let input = $state('');
	let modelLoading = $state(false);
	let isError = $state(false);
	let errorMessage = $state<string | null>(null);

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
			errorMessage = error.message;
		}
	});

	$effect(() => {
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

	function onsubmit(event: Event) {
		event.preventDefault();
		if (!page.params.id) return;

		saveMessage(
			{ id: crypto.randomUUID(), role: 'user', parts: [{ type: 'text', text: input }] },
			page.params.id
		);
		chat.sendMessage({ text: input }, { body: { model: currentChat?.model } });
	}
</script>

<svelte:head>
	<title
		>{page.params.id
			? `${$chats.find((chat) => chat.id === page.params.id)?.name} | Ollami`
			: 'New Chat'}</title
	>
</svelte:head>

{#if isError}
	<div class="-full mx-auto max-w-2xl py-20">
		<div class="rounded-2xl bg-red-50 p-2 text-red-500">
			<h3 class="text-xl">Oups, an error occurred</h3>
			<p class="text-sm">{errorMessage}</p>
		</div>
	</div>
{:else if currentChat && currentChat?.model}
	<Chat
		messages={chat.messages}
		bind:input
		{onsubmit}
		status={chat.status}
		model={currentChat?.model}
	/>
{/if}
