<script lang="ts">
	import Editor from '$lib/components/companions-ui/Editor.svelte';
	import {
		companions,
		getCompanion,
		createCompanion,
		deleteCompanion
	} from '$lib/stores/companionsStorage';
	import { Plus, Search } from '@lucide/svelte';

	let currentCompanion = $state(getCompanion('112251102'));
	let search = $state('');

	const handleCompanionCreation = () => {
		const id = createCompanion({
			id: crypto.randomUUID(),
			name: 'New Companion',
			system: 'Start typing your system prompt'
		});
		currentCompanion = getCompanion(id);
	};

	const handleCompanionDeletion = (id: string) => {
		const firstId = deleteCompanion(id);
		if (firstId) {
			currentCompanion = getCompanion(firstId);
		}
	};

	const handleSelectCompanion = (id: string) => {
		currentCompanion = getCompanion(id);
	};

	const filteredCompanions = $derived($companions.filter((c) => c.name.includes(search)));
</script>

<div class="h-screen overflow-hidden p-4 pl-0">
	<div
		class="border-glass relative flex h-full w-full flex-col gap-4 rounded-2xl bg-white/20 p-5 shadow dark:bg-zinc-800/50"
	>
		<header class="flex items-start justify-between">
			<div>
				<h1 class="mb-2 text-2xl">Companions</h1>
				<p class="text-sm text-zinc-500">Set prompts and agents configuration.</p>
			</div>

			<button
				onclick={() => {
					handleCompanionCreation();
				}}
				class="flex items-center gap-1 rounded-lg bg-black px-4 py-2 text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-700"
			>
				<Plus size={18} />
				Create</button
			>
		</header>
		<div class="flex h-full flex-col gap-4">
			<div
				class="grid h-full grid-cols-8 overflow-clip rounded-xl border border-zinc-200 bg-white shadow dark:border-zinc-700 dark:bg-zinc-800"
			>
				{#snippet menuItem(id: string, name: string)}
					<button
						onclick={() => {
							handleSelectCompanion(id);
						}}
						class="flex w-full items-center gap-2 rounded-lg p-2 transition-colors {currentCompanion?.id ===
						id
							? 'bg-zinc-100 dark:bg-zinc-700'
							: 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-700'}"
					>
						{name}
					</button>
				{/snippet}

				<div
					class="col-span-2 flex flex-col gap-2 border-r border-zinc-200 p-2 dark:border-zinc-700"
				>
					<header class="flex items-center gap-2 p-2">
						<div
							class="flex w-full items-center gap-1 rounded-lg border border-zinc-200 px-2 py-1 outline-zinc-400 transition-colors focus-within:bg-transparent focus-within:outline hover:bg-zinc-100 dark:border-zinc-700 dark:outline-zinc-600 dark:hover:bg-zinc-700"
						>
							<Search size={20} />
							<input
								bind:value={search}
								type="text"
								placeholder="Search a companion"
								class="w-full border-none bg-none p-1 text-sm placeholder:text-zinc-400 focus:outline-none dark:placeholder:text-zinc-500"
							/>
						</div>
						<button
							onclick={() => handleCompanionCreation()}
							aria-label="Create a new companion"
							class="flex items-center justify-center gap-1 rounded-lg bg-zinc-100 p-2 text-sm transition-colors hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600"
							><Plus size={16} /> New</button
						>
					</header>
					{#each filteredCompanions as companion (companion.id)}
						{@render menuItem(companion.id, companion.name)}
					{/each}
				</div>

				<div
					class="col-span-6 flex h-full flex-col divide-y divide-zinc-200 bg-white dark:divide-zinc-700 dark:bg-zinc-900"
				>
					{#key currentCompanion}
						{#if currentCompanion}
							<Editor
								id={currentCompanion.id}
								{currentCompanion}
								bind:content={currentCompanion.system}
								ondelete={handleCompanionDeletion}
							/>
						{/if}
					{/key}
				</div>
			</div>
		</div>
	</div>
</div>
