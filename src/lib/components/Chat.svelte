<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { useChat } from 'ai/svelte';
	// Stores
	import { history } from '$lib/stores/history';
	import { models } from '$lib/stores/models';
	import { companions } from '$lib/stores/companions';
	import { collections } from '$lib/stores/collections';
	import { fullscreen, ollamaIsActivated } from '$lib/stores/states';
	// Components
	import AssistantMessage from './chat/AssistantMessage.svelte';
	import UserMessage from './chat/UserMessage.svelte';
	import Tooglefullsize from './chat/Tooglefullsize.svelte';
	import Input from './chat/Input.svelte';
	import LoadingModel from './chat/LoadingModel.svelte';
	import RagState from './chat/RagState.svelte';
	import Locker from './icons/Locker.svelte';
	import SidebarData from './chat/SidebarData.svelte';

	let chatModel = '';
	let active = false;
	let rag = false;
	let collectionName = '';
	let chatContainer = null;
	let ram = false;
	let writing = false;

	// AI SDK UI
	const { input, messages, setMessages, append, stop } = useChat({
		sendExtraMessageFields: true,
		onResponse: () => {
			ram = false;
			writing = true;
		},
		onFinish: updateChat
	});

	// Custom AI SDK Function to send a message
	function handleSubmit() {
		if ($input.includes('/') && $input.indexOf('/') === 0) {
			return;
		}
		if ($input) {
			ram = true;
			append(
				{ role: 'user', content: $input },
				{
					options: { body: { model: chatModel, collectionName } }
				}
			);
		}
		$input = '';
	}

	// Page Store to get the current chat
	$: {
		if (browser) {
			const currentChat = getCurrentChat($history, $page.params.id);
			if (currentChat) {
				setupChatParameters(currentChat);
				setMessages(currentChat.messages);
				handleFirstMessage(currentChat, active);
			}
		}
	}

	// Stores to get the models, companions and files
	function getCurrentChat(history, id) {
		return history.find((conv) => conv.id === id);
	}

	// Function to setup the chat parameters
	function setupChatParameters(currentChat) {
		chatModel = currentChat.model;
		//collectionID = currentChat.id;
		active =
			$models.find((model) => model.image === chatModel.image) ||
			$companions.find((companion) => companion.model === chatModel.image);

		if (currentChat?.collections?.length > 0) {
			// Get the collection if it exists in the collections store
			const collection = $collections.find((col) => currentChat.collections.includes(col.name));

			if (collection && collection.files.length > 0) {
				// Set the collection name and enable rag
				rag = true;
				collectionName = collection.name;
			} else {
				rag = false;
			}
		} else {
			rag = false;
		}
	}

	// Function to handle the first message
	function handleFirstMessage(currentChat, active) {
		if (currentChat.messages.length === 2 && currentChat.messages[1].role === 'user' && active) {
			ram = true;
			append(
				{ role: 'user', content: currentChat.messages[1].content },
				{
					options: { body: { model: chatModel, collectionName } }
				}
			);
		}
	}

	// Function to rename the chat
	async function renameChat(chat) {
		// generate a title for the chat fetching /api/rename-chat
		const response = await fetch('/api/chat/rename', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ image: chatModel.image, messages: chat })
		});

		let title = await response.json();
		title = title.replace(/"/g, '');

		history.update((chats) => {
			const index = chats.findIndex((conv) => conv.id === $page.params.id);
			chats[index].name = title;
			return chats;
		});
	}

	// Function to update the chat
	function updateChat() {
		writing = false;
		let chat = $messages.map((message) => {
			return {
				role: message.role,
				content: message.content
			};
		});

		if (chat.length === 2) {
			renameChat(chat);
		}

		history.update((chats) => {
			const index = chats.findIndex((conv) => conv.id === $page.params.id);
			chats[index].messages = chat;
			return chats;
		});
	}

	// Function to regenerate the chat
	function regenerate(event) {
		// remove last message in messages using setMessages
		const index = event.detail.index;
		const query = $messages[index - 1];

		// Remove the index message and the index-1 message
		setMessages((messages) => {
			messages.splice(index, 1);
			messages.splice(index - 1, 1);
			return messages;
		});

		// Append the new message
		append(
			{ role: 'user', content: query.content },
			{
				options: { body: { model: chatModel } }
			}
		);
	}

	let sidebarDataOpen = false;

	function toggleSidebarData() {
		sidebarDataOpen = !sidebarDataOpen;
	}

	$: if ($messages.length > 1) {
		chatContainer.scrollTop = chatContainer.scrollHeight;
	}
</script>

<div
	class="h-screen p-2 {$fullscreen ? 'w-full' : 'w-4/5 pl-2'} transition-all absolute right-0 top-0"
>
	<div
		class="h-full overflow-hidden relative p-4 pr-2 rounded-2xl border bg-white text-black dark:text-white border-black-200 dark:bg-black-800 dark:border-black-600"
	>
		<div class="flex justify-between right-6 gap-2 absolute top-4 left-4 items-center">
			<span class=" bg-black-100 dark:bg-black-600 px-3 font-mono text-xs py-2 rounded-md"
				>{chatModel?.image}</span
			>
			{#if rag}
				<RagState name={collectionName} on:open={toggleSidebarData} />
			{/if}
		</div>

		<Tooglefullsize />

		<div bind:this={chatContainer} class="h-full overflow-y-auto pt-20 pb-32">
			<div class="w-full max-w-2xl mx-auto">
				{#each $messages as message, i}
					{#if message.role === 'assistant'}
						<AssistantMessage
							on:regenerate={regenerate}
							index={i}
							content={message.content}
							model={chatModel}
						/>
					{/if}
					{#if message.role === 'user'}
						<UserMessage content={message.content} />
					{/if}
				{/each}
				{#if ram}
					<LoadingModel />
				{/if}
			</div>
			{#if $ollamaIsActivated && active}
				<Input bind:value={$input} on:submit={handleSubmit} on:stop={stop} {writing} on:uploaded />
			{:else}
				<div
					class="absolute bottom-2 left-2 right-2 pb-10 z-10 bg-gradient-to-r from-white dark:from-black-800 from-80% to-90%"
				>
					<div
						class="w-full max-w-2xl mx-auto bg-black-100 text-black-400 rounded-lg p-4 flex items-center gap-2 justify-center"
					>
						<Locker />
						Your chat model is not installed. Please
						<a href="/models" class="underline">install it</a> to resume the chat.
					</div>
				</div>
			{/if}
		</div>

		{#if sidebarDataOpen}
			<SidebarData name={collectionName} on:close={toggleSidebarData} />
		{/if}
	</div>
</div>
