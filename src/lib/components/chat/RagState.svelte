<script>
	import { browser } from '$app/environment';
	import { collections } from '$lib/stores/collections';
	import { createEventDispatcher } from 'svelte';
	export let name = '';
	let count = 0;

	const dispatch = createEventDispatcher();

  function openSidebarData() {
    dispatch('open');
  }

	$: {
		if (browser && $collections) {
			// find the files in localstroage that have the chat id
			const collections = JSON.parse(localStorage.getItem('collections'));
			const collection = collections.find((col) => col.name === name);
			count = collection.files.length;
		}
	}
</script>

<button
on:click={openSidebarData}
	class=" bg-purple/10 text-purple p-2 pl-3 flex gap-2 items-center text-sm rounded-md hover:shadow-lg hover:shadow-purple-300 transition-shadow"
	>RAG <span class="p-1 px-2 rounded bg-purple-600 text-white">{count} File</span></button
>
