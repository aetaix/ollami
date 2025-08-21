<script lang="ts">
	import ModelCard from '$lib/components/models-ui/ModelCard.svelte';
	import { extendedModels } from '$lib/stores/models.svelte';

	const providerFilters = ['', 'ollama', 'api'];

	let filters = $state({
		search: '',
		provider: '', // '' means "All", 'ollama' means "Local", 'api' means "API"
		author: ''
	});

	// Derive models filtered only by provider and search
	const filteredModelsByProviderAndSearch = $derived.by(() => {
		return extendedModels.filter((model) => {
			const providerMatch =
				filters.provider === '' ||
				(filters.provider === 'ollama' && model.provider === 'ollama') ||
				(filters.provider === 'api' && model.provider !== 'ollama');
			const searchMatch =
				!filters.search || model.name.toLowerCase().includes(filters.search.toLowerCase());
			return providerMatch && searchMatch;
		});
	});

	// Derive authors from models filtered only by provider and search
	const filteredAuthors = $derived.by(() => {
		return [...new Set(filteredModelsByProviderAndSearch.map((model) => model.author))];
	});

	// Derive models filtered by all filters (provider, search, and author)
	const filteredModels = $derived.by(() => {
		return filteredModelsByProviderAndSearch.filter((model) => {
			const authorMatch = !filters.author || model.author === filters.author;
			return authorMatch;
		});
	});
</script>

<div class="p-4 pl-0">
	<div
		class="border-glass flex w-full flex-col gap-4 rounded-2xl bg-white/20 p-5 shadow dark:bg-zinc-800/50"
	>
		<header class="flex flex-col items-start">
			<h1 class="mb-2 text-2xl">Models</h1>
			<p class="text-sm text-zinc-500">
				Browse and install a curated collection of AI models. All Ollama models are not available in
				Ollami. We curated a selection of models that are small, fast, and efficient.
			</p>
		</header>
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<div class="flex items-center gap-2 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900">
						{#each providerFilters as provider}
							<button
								onclick={() => (filters.provider = provider)}
								class="rounded-lg transition-colors px-4 py-2 text-sm font-medium capitalize {provider ===
								filters.provider
									? 'bg-zinc-800 text-white'
									: 'text-zinc-700 dark:text-zinc-400'}">{provider || 'All'}</button
							>
						{/each}
					</div>
				</div>
				<div>
					<input
						type="text"
						placeholder="Search models..."
						bind:value={filters.search}
						class="rounded-lg border border-zinc-300 bg-transparent px-4 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700"
					/>
				</div>
			</div>
			<div
				class="grid grid-cols-8 overflow-clip rounded-2xl border border-zinc-200 bg-white shadow dark:border-zinc-700 dark:bg-zinc-800"
			>
				{#snippet authorOption(author: string)}
					<button
						class="flex w-full transition-colors items-center gap-2 rounded-lg p-2 {filters.author === author
							? 'bg-zinc-800 text-white'
							: 'text-zinc-700 dark:text-zinc-400'}"
						onclick={() => (filters.author = author)}
					>
						{#if author}
						<img src="/provider-icons/{author}.svg" alt="" class="size-5" />
						{/if}
						{author || 'All'}
					</button>
				{/snippet}
				<!-- Only show author selection if there are filtered models -->
				{#if filteredModelsByProviderAndSearch.length > 0}
					<div
						class="col-span-2 flex flex-col gap-2 border-r border-zinc-200 p-2 dark:border-zinc-700"
					>
						{@render authorOption('')}
						{#each filteredAuthors as author}
							{@render authorOption(author)}
						{/each}
					</div>
				{/if}
				<div class="col-span-6 grid grid-cols-2 gap-4 bg-zinc-50 p-4 dark:bg-zinc-900">
					{#if filteredModels.length > 0}
						{#each filteredModels as model}
							<ModelCard model={model} />
						{/each}
					{:else}
						<div class="col-span-8 p-4 text-center text-zinc-500">
							No models match the current filters.
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
