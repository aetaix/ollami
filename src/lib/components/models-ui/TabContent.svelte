<script lang="ts">
	import Download from './download.svelte';
	let {
		tab
	}: {
		tab: {
			label: string;
			models: App.Model[];
		};
	} = $props();

	let search = $state('');

	let filteredModels = $derived(tab.models.filter((model) =>
		model.name.toLowerCase().includes(search.toLowerCase())
	));
</script>

<div class="p-4">
    <input type="text" bind:value={search} placeholder="Search models..." class="mb-4 w-full rounded border border-zinc-200 dark:border-zinc-700 p-2" />
	<h2 class="text-lg">{tab.label} Models</h2>
	<p class="text-sm text-zinc-800 dark:text-zinc-200">Select a model to view details and installation options.</p>
	<div class="grid grid-cols-3 gap-4">
		{#each filteredModels as model}
			<div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 shadow transition-shadow hover:shadow-lg">
				<h3 class="text-md font-semibold">{model.name}</h3>
				<p class="text-sm text-zinc-800 dark:text-zinc-200">{model.description}</p>
				<button
					class="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					onclick={() => {
						// Handle model download or installation
						console.log(`Downloading ${model.name}`);
					}}
				>
					Download
				</button>
			</div>
		{/each}
	</div>
</div>
