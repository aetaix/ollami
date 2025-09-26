<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { PanelLeft } from '@lucide/svelte';
	import { settings } from '$lib/stores/appStorage.svelte';
	import { models } from '$lib/stores/models.svelte';
	import staticModels from '$lib/models';

	let { children, data } = $props();

	let isSidebarOpen = $state(true);

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}

	// initialize models store with static models and mark installed models
	const updated = staticModels.map((model) => ({
		...model,
		installed: data.models.has(model.api + ':' + (model.parameters || 'latest'))
	}));

	models.models = updated;
	models.selectedModel = models.models[0];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<ModeWatcher />
<main class="flex h-screen justify-end">
	{#if settings.background}
		<img
			src={settings.background}
			alt="Background"
			class="fixed inset-0 -z-10 h-full w-full object-cover opacity-20 blur-md brightness-120 dark:opacity-40 dark:brightness-75"
		/>
	{/if}
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
