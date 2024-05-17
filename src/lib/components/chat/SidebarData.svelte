<script>
	import { createEventDispatcher } from 'svelte';
	import { collections } from '$lib/stores/collections';
	import Uploader from '$lib/components/collections/Uploader.svelte';
	import Trash from '../icons/Trash.svelte';

	export let name = '';

	const dispatch = createEventDispatcher();
	function closeSidebarData() {
		dispatch('close');
	}

	$: chatCollections = $collections.filter((collection) => collection.name === name);

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
</script>

<div
	class="absolute top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur z-20 p-4 flex justify-end"
>
	<div id="sidebar" class="h-full bg-white w-1/2 rounded-xl border border-black-200 shadow-lg">
		<header class="flex items-center justify-between p-4 border-b border-black-200">
			<h3 class="font-semibold">Chat Data Context</h3>
			<button on:click={closeSidebarData}>Close</button>
		</header>
		<div>
			{#each chatCollections as collection}
				<div class="p-4 border-b border-black-200">
					<header class="flex justify-between items-center mb-4">
						<div class="flex items-center">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5 12.5C5 12.813 5.461 13.358 6.53 13.893C7.914 14.585 9.877 15 12 15C14.123 15 16.086 14.585 17.47 13.893C18.539 13.358 19 12.813 19 12.5V10.329C17.35 11.349 14.827 12 12 12C9.173 12 6.65 11.348 5 10.329V12.5ZM19 15.329C17.35 16.349 14.827 17 12 17C9.173 17 6.65 16.348 5 15.329V17.5C5 17.813 5.461 18.358 6.53 18.893C7.914 19.585 9.877 20 12 20C14.123 20 16.086 19.585 17.47 18.893C18.539 18.358 19 17.813 19 17.5V15.329ZM3 17.5V7.5C3 5.015 7.03 3 12 3C16.97 3 21 5.015 21 7.5V17.5C21 19.985 16.97 22 12 22C7.03 22 3 19.985 3 17.5ZM12 10C14.123 10 16.086 9.585 17.47 8.893C18.539 8.358 19 7.813 19 7.5C19 7.187 18.539 6.642 17.47 6.107C16.086 5.415 14.123 5 12 5C9.877 5 7.914 5.415 6.53 6.107C5.461 6.642 5 7.187 5 7.5C5 7.813 5.461 8.358 6.53 8.893C7.914 9.585 9.877 10 12 10Z"
									fill="#09121F"
								/>
							</svg>

							<h4 class="font-semibold">
								{collection.name} -
								<span class="bg-purple-100 rounded text-purple-950 p-1 text-sm"
									>{collection.files.length} Files</span
								>
							</h4>
						</div>
						<button
							on:click={() => deleteCollection(collection.name)}
							class=" w-8 h-8 flex justify-center items-center rounded bg-black-100 hover:bg-black-200 transition-all"
						>
							<Trash class="w-4" />
						</button>
					</header>

					<div class=" border rounded-lg border-black-200 shadow-sm">
						{#each collection.files as file}
							<div class="group flex items-center justify-between p-2 border-b border-black-200">
								<div class="flex items-center gap-2">
									<h4 class="font-semibold text-sm">{file.name}</h4>
									<span class="bg-black-100 p-1 rounded text-sm">
										{file.chunks} Chunks
									</span>
								</div>

								<button
									on:click={() => deleteFile(file.id, collection.name)}
									class=" w-8 h-8 opacity-0 group-hover:opacity-100 flex justify-center items-center rounded bg-black-100 hover:bg-black-200 transition-all"
								>
									<Trash class="w-4" />
								</button>
							</div>
						{/each}
						<div class="p-2 flex">
							<Uploader {name} />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	#sidebar {
		animation: entrance 0.2s cubic-bezier(0, 0.62, 0.39, 0.98);
		animation-fill-mode: backwards;
	}

	@keyframes entrance {
		0% {
			opacity: 0;
			transform: translateX(100%);
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>
