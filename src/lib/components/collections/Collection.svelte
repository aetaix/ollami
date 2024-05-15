<script>
	import { browser } from '$app/environment';
	import { collections } from '$lib/stores/collections';
	import { models } from '$lib/stores/models';
	import Plus from '../icons/Plus.svelte';
	import Trash from '../icons/Trash.svelte';
	import Url from '../icons/Url.svelte';
	export let collection = {};

	let loading = false;
	let success = false;
	let count = 0;
	let inputFile;

	// Check the localstorage chats and find the one that have this collection name and add them to usedBy array

	let usedBy = [];
	if (browser) {
		const chats = JSON.parse(localStorage.getItem('chats')) || [];

		chats.forEach((chat) => {
			// chat.collections is an array, check if the collection name is in the array
			if (chat.collections?.includes(collection.name)) {
				usedBy.push(chat.id);
				console.log(usedBy);
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

	async function addChat() {}

	function upload() {
		inputFile.click();
	}

	async function addFile() {
		loading = true;
		const inputFiles = inputFile.files;
		count = inputFiles.length;
		//const file = inputFile.files[0];
		const formData = new FormData();

		for (let i = 0; i < inputFiles.length; i++) {
			formData.append('files', inputFiles[i]);
			formData.append('fileName', inputFiles[i].name);
		}

		formData.append(
			'image',
			$models.filter((m) => m.tags.includes('embeddings') && m.installed)[0]?.image
		);

		formData.append('name', collection.name);

		try {
			fetch('/api/files/add', {
				method: 'POST',
				body: formData
			})
				.then((res) => res.json())
				.then(async (data) => {
					console.log(data.newFiles);

					// update the collections store
					collections.update((c) => {
						c.forEach((col) => {
							if (col.name === collection.name) {
								col.files = [...col.files, ...data.newFiles];
								col.updated_at = new Date().toISOString();
							}
						});
						return c;
					});

					localStorage.setItem('collections', JSON.stringify($collections));

					loading = false;
					success = true;
					setTimeout(() => {
						success = false;
					}, 2000);
				});
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div id={collection.name} class="bg-white rounded-xl mb-4 shadow-sm border border-black-200">
	<header class="flex gap-4 items-center justify-between mb-4 p-4 pb-0">
		<div class="flex gap-2 items-center">
			<div class="">
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
					class="group flex justify-between gap-4 items-center p-2 hover:bg-black-100 transition-colors border-b border-black-200 hover:rounded-lg hover:border-transparent text-sm mb-2 last:border-transparent"
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
			<button
				on:click={upload}
				class="p-2 text-sm rounded hover:bg-black-100 flex justify-center items-center gap-2"
			>
				<Plus class="w-5" />
				Add File
			</button>
			<input
				on:change={addFile}
				bind:this={inputFile}
				type="file"
				id="file"
				class=" sr-only"
				accept=".pdf,.txt,.docx,.csv,.pptx"
				multiple
			/>
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
			<button
				on:click={addChat}
				class=" w-8 h-8 flex justify-center items-center rounded bg-black-100 hover:bg-black-200 transition-all"
			>
				<Plus class="w-6" />
			</button>
		</div>
	</footer>
</div>
