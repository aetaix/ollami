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
		class="flex justify-center flex-grow flex-col items-center  border bg-black-50 border-black-200 dark:border-black-600 shadow-sm dark:bg-black-900 rounded-xl"
	>
	<div class="w-full flex-grow flex justify-center items-center">
		<div class="bg-white dark:bg-black-700 max-w-lg mx-auto shadow-lg rounded-xl border border-black-200 dark:border-black-600">
		  <header class="h-[240px]">
			<img src="/img/db.png" class="w-full h-full object-cover rounded-t-xl" alt="">
		  </header>
		  <div class="p-4">
			<h2 class="font-semibold text-lg">Data context for your chats</h2>
			<p>Data collection help your chat give more relevant answer to your queries: submit and put your data in context to extend your model capacities beyond its own knowledge.</p>
		  </div>
		  <footer class="border-t border-black-200 dark:border-black-600 p-4 flex items-center justify-end">
			<button class="bg-black hover:bg-black-800 rounded-lg px-3 py-2 text-white">
			  Create your first data collection
			</button>
		  </footer>
		</div>
	  </div>
	</div>
{:else}
	<div class="">
		{#each $collections as collection}
			<Collection {collection} />
		{/each}
	</div>
{/if}
