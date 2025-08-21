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
<main class="flex h-screen justify-end">
	<!-- <img
		src="/bg/1.jpg"
		alt="Background"
		class="fixed inset-0 -z-10 h-full w-full object-cover brightness-120 dark:brightness-75 blur-md opacity-20 dark:opacity-40"
	/> -->
	{#if isSidebarOpen}
		<Sidebar ontogglesidebar={toggleSidebar} />
	{/if}
	<div
		class="relative transition-all duration-300 ease-in-out {isSidebarOpen
			? 'w-[calc(100%-320px)]'
			: 'w-full pl-16'}"
	>
		{#if !isSidebarOpen}
			<button
				onclick={toggleSidebar}
				class="absolute top-4 left-4 z-10 rounded-lg p-2 transition-colors hover:bg-neutral-50 hover:shadow-none dark:hover:bg-zinc-800"
			>
				<PanelLeft size={20} />
			</button>
		{/if}
		{@render children?.()}
	</div>
</main>
