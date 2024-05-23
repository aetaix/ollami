<script>
	import { browser } from '$app/environment';
	import { history } from '$lib/stores/history';

	import MessageIcon from '../icons/MessageIcon.svelte';

	export let currentCollection = '';
    export let hide = true;

	function setCollectionToChat(chat) {
		console.log(chat);

		if (browser) {
			// Find the chat in the localstorage WITH the id and then update its collections array
			const chats = JSON.parse(localStorage.getItem('chats')) || [];

			const chatIndex = chats.findIndex((c) => c.id === chat);

			if (chatIndex !== -1) {
				chats[chatIndex].collections = chats[chatIndex].collections || [];
				chats[chatIndex].collections.push(currentCollection);
				localStorage.setItem('chats', JSON.stringify(chats));
                hide = true;
			}
		}
	}
</script>

{#if !hide}

<div
	class="bg-white absolute border border-black-200 top-10 rounded-lg shadow left-0 w-[340px] z-10 max-h-[400px] overflow-y-auto"
>
	{#each $history as chat}
		<button
			on:click={() => setCollectionToChat(chat.id)}
			class="flex w-full gap-2 hover:bg-black-50 p-2 border-b border-black-200 last:border-0"
		>
			<MessageIcon class="w-4" />
			<span class="text-sm">{chat.name}</span>
		</button>
	{/each}
</div>

{/if}
