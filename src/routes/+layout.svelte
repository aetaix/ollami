<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { PanelLeft } from '@lucide/svelte';

	let { children } = $props();

	let isSidebarOpen = $state(true);

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<ModeWatcher />
<main class="flex h-screen justify-end  bg-cover bg-center bg-no-repeat">
	<Sidebar ontogglesidebar={toggleSidebar} />
	<main
		class="relative bg-white/90 dark:bg-zinc-900/30 backdrop-blur-[100px] transition-all {isSidebarOpen
			? 'w-[calc(100%-320px)]'
			: 'w-full'}"
	>
		{#if !isSidebarOpen}
			<button onclick={toggleSidebar} class="absolute top-4 left-4 rounded-lg p-2 transition-colors hover:bg-neutral-50 dark:hover:bg-zinc-800 hover:shadow-none z-10">
				<PanelLeft size={20} />
			</button>
		{/if}
		{@render children?.()}
	</main>
</main>
