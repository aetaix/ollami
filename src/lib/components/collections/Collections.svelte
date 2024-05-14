<script>
	import { collections } from '$lib/stores/collections';
	import { browser } from '$app/environment';
	import Collection from './Collection.svelte';

  console.log($collections.length);

	if ($collections.length === 0 && browser && localStorage.getItem('collections')) {
		collections.set(JSON.parse(localStorage.getItem('collections')));
	}
</script>

{#if $collections.length === 0}
	<div
		class="flex justify-center flex-col items-center h-96 border border-black-200 dark:border-black-600 shadow dark:bg-black-900 rounded-xl"
	>
		<p class="text-black-500 dark:text-black-200 mb-2">No data found</p>
		<a
			href="/"
			class="border flex gap-2 items-center border-black-200 z-10 hover:bg-black-50 transition-colors text-black bg-white shadow px-4 py-2 rounded-lg"
		>
			Start a RAG chat</a
		>
	</div>
{:else}
<div>
  {#each $collections as collection}
				<Collection
          {collection}
				/>
			{/each}
</div>
{/if}
