<script>
	import { collections } from '$lib/stores/collections';
	import { c } from 'svelte-highlight/languages';
	export let collection = {};

	// function to round file size to ko, mo or go
	function formatBytes(bytes, decimals = 2) {
		if (bytes === 0) return '0 Bytes';

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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

		/*
		files.update((f) => f.filter((file) => file.id !== id));
		localStorage.setItem('files', JSON.stringify($files));
    */
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

		/*

    files.update((f) => f.filter((file) => file.id !== id));
    localStorage.setItem('files', JSON.stringify($files));
    */
	}
</script>

<div class="flex gap-2 items-center py-4 border-b">
	<div class="w-1/5">
		<h3 class="font-bold">{collection.name}</h3>
	</div>
	<div class="w-1/5">
		<h3 class="font-bold">{collection.files.length}</h3>
	</div>
	<div class="w-1/5">
		<h3 class="font-bold">{collection.created_at}</h3>
	</div>
	<div class="w-1/5">
		<button
			class="bg-red-500 px-2 py-1 rounded-lg"
			on:click={() => deleteCollection(collection.name)}
		>
			Delete
		</button>
	</div>
</div>
<div>
	{#each collection.files as file}
		<div class="flex gap-2 items-center py-4 border-b">
			<div class="w-1/5">
				<h3 class="font-bold">{file.name}</h3>
			</div>
			<div class="w-2/5">
				<h3 class="">{file.id}</h3>
			</div>
			<div class="w-1/5">
				<h3 class="font-bold">{file.chunks}</h3>
			</div>
			<div class="w-1/5">
				<button
					class="bg-red-500 px-2 py-1 rounded-lg"
					on:click={() => deleteFile(file.id, collection.name)}
				>
					Delete
				</button>
			</div>
		</div>
	{/each}
</div>
