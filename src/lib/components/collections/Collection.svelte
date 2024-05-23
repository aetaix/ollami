<script>
	import { browser } from '$app/environment';
	import { collections } from '$lib/stores/collections';
	import Uploader from './Uploader.svelte';
	import Plus from '../icons/Plus.svelte';
	import Trash from '../icons/Trash.svelte';
	import Url from '../icons/Url.svelte';
	import ChatSelection from './ChatSelection.svelte';
	export let collection = {};

	// Check the localstorage chats and find the one that have this collection name and add them to usedBy array

	let usedBy = [];
	if (browser) {
		const chats = JSON.parse(localStorage.getItem('chats')) || [];

		chats.forEach((chat) => {
			// chat.collections is an array, check if the collection name is in the array
			if (chat.collections?.includes(collection.name)) {
				usedBy.push(chat.id);
		
			}
		});
	}

	async function deleteCollection(name) {
		fetch('api/files/delete/collection', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name })
		});

		collections.update((c) => c.filter((col) => col.name !== name));
		localStorage.setItem('collections', JSON.stringify($collections));
	}

	async function deleteFile(id, name) {
		fetch('api/files/delete/file', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, name })
		});

		collections.update((c) => {
			c.forEach((col) => {
				col.files = col.files.filter((file) => file.id !== id);
			});
			return c;
		});

		// if collection is empty, remove it
		if ($collections.find((col) => col.files.length === 0)) {
			collections.update((c) => c.filter((col) => col.files.length > 0));
		}

		localStorage.setItem('collections', JSON.stringify($collections));
	}

	let showChats = true;
	async function toogleChatSelection() {
		showChats = !showChats;
	}

	
</script>

<div id={collection.name} class="bg-white rounded-xl mb-4 shadow-sm border border-black-200">
	<header class="flex gap-4 items-center justify-between mb-4 p-4 pb-0">
		<div class="flex gap-2 items-center">
			<div class="flex gap-2">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M5 12.5C5 12.813 5.461 13.358 6.53 13.893C7.914 14.585 9.877 15 12 15C14.123 15 16.086 14.585 17.47 13.893C18.539 13.358 19 12.813 19 12.5V10.329C17.35 11.349 14.827 12 12 12C9.173 12 6.65 11.348 5 10.329V12.5ZM19 15.329C17.35 16.349 14.827 17 12 17C9.173 17 6.65 16.348 5 15.329V17.5C5 17.813 5.461 18.358 6.53 18.893C7.914 19.585 9.877 20 12 20C14.123 20 16.086 19.585 17.47 18.893C18.539 18.358 19 17.813 19 17.5V15.329ZM3 17.5V7.5C3 5.015 7.03 3 12 3C16.97 3 21 5.015 21 7.5V17.5C21 19.985 16.97 22 12 22C7.03 22 3 19.985 3 17.5ZM12 10C14.123 10 16.086 9.585 17.47 8.893C18.539 8.358 19 7.813 19 7.5C19 7.187 18.539 6.642 17.47 6.107C16.086 5.415 14.123 5 12 5C9.877 5 7.914 5.415 6.53 6.107C5.461 6.642 5 7.187 5 7.5C5 7.813 5.461 8.358 6.53 8.893C7.914 9.585 9.877 10 12 10Z" fill="#09121F"/>
					</svg>
					
				<h2 class="font-bold">{collection.name}</h2>
			</div>
			<div class="">
				<span class="p-2 text-sm rounded bg-purple-100">{collection.files.length} File</span>
			</div>
		</div>
		<button
			on:click={() => deleteCollection(collection.name)}
			class=" w-8 h-8 flex justify-center items-center rounded bg-black-100 hover:bg-black-200 transition-all"
		>
			<Trash class="w-4" />
		</button>
	</header>
	<div class="px-4 pb-4">
		<div class="ml-2 pl-2 border-l border-black-200">
			{#each collection.files as file}
				<div
					class="group flex justify-between gap-4 items-center p-2 hover:bg-black-100 transition-colors border-b border-black-200 hover:rounded-lg hover:border-transparent text-sm  last:border-transparent"
				>
					<div class="flex items-center gap-2">
						<div class="">
							<h3 class="font-semibold bg-white shadow rounded border border-black-200 p-1">
								{file.name}
							</h3>
						</div>
						<div class="">
							<span class="p-2 text-sm rounded bg-black-100">{file.chunks} Chunks</span>
						</div>
					</div>
					<button
						on:click={() => deleteFile(file.id, collection.name)}
						class=" w-8 h-8 opacity-0 group-hover:opacity-100 flex justify-center items-center rounded bg-black-100 hover:bg-black-200 transition-all"
					>
						<Trash class="w-4" />
					</button>
				</div>
			{/each}
			<Uploader class="mt-2" name={collection.name} />
		</div>
	</div>

	<footer class="p-4 border-t border-black-200">
		<p class="text-sm mb-2">Context for</p>
		<div class="flex gap-2 items-center">
			{#each usedBy as id}
				<a
					href={`/chat/${id}`}
					class="text-sm flex gap-1 items-center p-2 shadow rounded bg-white border border-black-200"
					>{id} <Url class="w-4" />
				</a>
			{/each}
			<div class="relative">
				<button
				on:click={toogleChatSelection}
				class=" w-8 h-8 flex justify-center items-center rounded bg-black-100 hover:bg-black-200 transition-all"
			>
				<Plus class="w-6" />
			</button>
			<ChatSelection currentCollection={collection.name} hide={showChats} />
			</div>

		</div>
	</footer>
</div>
