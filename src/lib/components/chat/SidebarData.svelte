<script>
	import { createEventDispatcher } from 'svelte';
    import { collections } from '$lib/stores/collections';
	export let collectionName = '';
	const dispatch = createEventDispatcher();
	function closeSidebarData() {
		dispatch('close');
	}

    let id = collectionName
</script>

<div
	class="absolute top-0 left-0 right-0 bottom-0 bg-white/30 backdrop-blur z-20 p-4 flex justify-end"
>
	<div id="sidebar" class="h-full bg-white w-2/5 rounded-xl border border-black-200 shadow-lg">
  <header class="flex items-center justify-between p-4 border-b border-black-200">
    <h3 class="font-semibold">Chat Data Context</h3>
    <button on:click={closeSidebarData}>Close</button>
  </header>
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
