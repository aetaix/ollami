<script lang="ts">
	import Editor from '$lib/components/companions-ui/Editor.svelte';

	const prompts = [
		{
			id: 'default',
			name: 'Default',
			description: '',
			prompt: ''
		}
	];

	const selectPrompt = $state(prompts[0]);
</script>

<div class="p-4 pl-0">
	<div
		class="border-glass flex w-full flex-col gap-4 rounded-2xl bg-white/20 p-5 shadow dark:bg-zinc-800/50"
	>
		<header class="flex flex-col items-start">
			<h1 class="mb-2 text-2xl">Companions</h1>
			<p class="text-sm text-zinc-500">Set prompts and agents configuration.</p>
		</header>
		<div class="flex flex-col gap-4">
			<div
				class="grid grid-cols-8 overflow-clip rounded-2xl border border-zinc-200 bg-white shadow dark:border-zinc-700 dark:bg-zinc-800"
			>
				{#snippet menuItem(id: string, name: string)}
					<button
						class="flex w-full items-center gap-2 rounded-lg p-2 transition-colors {selectPrompt.id ===
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
					{#each prompts as prompt (prompt.id)}
						{@render menuItem(prompt.id, prompt.name)}
					{/each}
				</div>

				<div class="col-span-6 bg-white p-4 dark:bg-zinc-900">
					<Editor content={selectPrompt.prompt} />
				</div>
			</div>
		</div>
	</div>
</div>
