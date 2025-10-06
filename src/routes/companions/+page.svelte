<script lang="ts">
	import Editor from '$lib/components/companions-ui/Editor.svelte';
	import {
		companions,
		getCompanion,
		updateCompanion,
		createCompanion
	} from '$lib/stores/companionsStorage';

	let currentCompanion = $state(getCompanion('112251102'));

	const handleCompanionCreation = () => {
		createCompanion({
			id: '',
			name: 'test',
			system: 'test'
		});
	};

	const handleSelectCompanion = (id: string) => {
		currentCompanion = $companions.find((c) => c.id === id);
	};
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
				class="rounded-lg bg-black px-4 py-1 text-white">Create</button
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
							? 'bg-zinc-100 '
							: 'text-zinc-700 dark:text-zinc-400'}"
					>
						{name}
					</button>
				{/snippet}

				<div
					class="col-span-2 flex flex-col gap-2 border-r border-zinc-200 p-2 dark:border-zinc-700"
				>
					{#each $companions as companion (companion.id)}
						{@render menuItem(companion.id, companion.name)}
					{/each}
				</div>

				<div
					class="col-span-6 flex h-full flex-col divide-y divide-zinc-200 bg-white dark:bg-zinc-900"
				>
					<div class="p-4">
						<h3 class="block text-sm opacity-50">Titre</h3>
						<input
							type="text"
							class="rounded-lg border border-zinc-200 p-1"
							value={currentCompanion?.name}
							oninput={(e) => {
								const name = (e.target as HTMLInputElement).value;
								if (currentCompanion) {
									updateCompanion(currentCompanion?.id, (companion) => {
										if (companion) {
											companion.name = name;
										}
										return companion;
									});
								}
							}}
						/>
					</div>
					<div class="p-4">
						<span class="text-sm opacity-50"> System Prompt </span>
						{#key currentCompanion}
							{#if currentCompanion}
								<Editor id={currentCompanion.id} bind:content={currentCompanion.system} />
							{/if}
						{/key}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
