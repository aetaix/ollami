<script lang="ts">
	import { models } from '$lib/stores/models.svelte';
	import { Globe } from '@lucide/svelte';

	const providerFilters = ['', 'ollama', 'api'];

	let filters = $state({
		search: '',
		provider: '', // '' means "All", 'ollama' means "Local", 'api' means "API"
		author: ''
	});

	// Derive models filtered only by provider and search
	const filteredModelsByProviderAndSearch = $derived.by(() => {
		return models.filter((model) => {
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
					<div class="flex items-center gap-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 p-1">
						{#each providerFilters as provider}
							<button
								onclick={() => (filters.provider = provider)}
								class="rounded-lg px-4 py-2 text-sm capitalize font-medium {provider === filters.provider ? 'bg-zinc-800 text-white' : 'text-zinc-700 dark:text-zinc-400'}"
								>{provider || 'All'}</button
							>
						{/each}
					</div>
				</div>
				<div>
					<input
						type="text"
						placeholder="Search models..."
						bind:value={filters.search}
						class="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none"
					/>
				</div>
			</div>
			<div
				class="grid grid-cols-8 overflow-clip rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow"
			>
				<!-- Only show author selection if there are filtered models -->
				{#if filteredModelsByProviderAndSearch.length > 0}
					<div class="col-span-2 flex flex-col gap-2 border-r border-zinc-200 dark:border-zinc-700 p-2">
						<button
							class="flex w-full items-center gap-2 p-2"
							onclick={() => (filters.author = '')}
						>
							All
						</button>
						{#each filteredAuthors as author}
							<button
								class="flex w-full items-center gap-2 p-2"
								onclick={() => (filters.author = author)}
							>
								<img src="/provider-icons/{author}.svg" alt="" class="size-5" />
								{author}
							</button>
						{/each}
					</div>
				{/if}
				<div class="col-span-6 grid grid-cols-2 gap-4 bg-zinc-50 dark:bg-zinc-900 p-4">
					{#if filteredModels.length > 0}
						{#each filteredModels as model}
							<div class="flex flex-col gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4">
								<header class="flex items-center justify-between gap-2">
									<div class="flex items-center gap-2">
										<img src="/provider-icons/{model.icon}" alt="" class="size-5" />
										<h3 >{model.name}</h3>
									</div>
									{#if model.provider !== 'ollama'}
										<Globe class="size-4 text-zinc-400" />
									{/if}
								</header>
								<p class="text-sm text-zinc-500">{model.description}</p>
								<footer class="flex items-center justify-between">
									<span class="rounded bg-zinc-100 dark:bg-zinc-700 p-1 text-sm capitalize">{model.author}</span>
								</footer>
							</div>
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
