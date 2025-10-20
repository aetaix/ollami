<script lang="ts">
	import { Cloud, Laptop, Trash, Check } from '@lucide/svelte';
	import Download from './Download.svelte';
	let { model, onselect } = $props();

	async function deleteModel(model: App.Model) {
		const res = await fetch('/api/models/ollama/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ model })
		});
		if (res.ok) {
			model.installed = false;
		} else {
			const errorData: { error: string } = await res.json();
			console.error('Failed to delete model:', errorData.error);
		}
	}
</script>

<article
	class="group flex flex-col gap-8 rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
>
	<div class="flex-grow">
		<header class="mb-2 flex items-start justify-between gap-2">
			<div class="flex items-center gap-2">
				<img src="/provider-icons/{model.icon}" alt="" class="size-5" />
				<h3>{model.name}</h3>
				{#if model.parameters}
					<span class="rounded bg-indigo-500/10 p-1 py-0 text-sm text-indigo-500 capitalize"
						>{model.parameters}</span
					>
				{/if}
			</div>
			{#if model.installed}
				<button
					onclick={() => deleteModel(model)}
					class="flex size-8 shrink items-center justify-center rounded bg-zinc-100 text-zinc-700 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 dark:bg-zinc-700 dark:text-zinc-200"
				>
					<Trash class="size-4 " />
				</button>
			{/if}
		</header>
		<p class="text-sm text-zinc-600 dark:text-zinc-300">{model.description}</p>
	</div>

	<footer class="flex items-center justify-between">
		<div class="flex items-center justify-start gap-2">
			{#if model.size}
				<span class="rounded bg-zinc-100 p-1 font-mono text-sm tabular-nums dark:bg-zinc-700"
					>{model.size}GB</span
				>
			{/if}
			<span class="rounded p-1 text-sm capitalize dark:bg-zinc-700">{model.author}</span>
		</div>

		{#if model.provider === 'ollama'}
			{#if model.installed}
				<div class="flex items-center group-hover:gap-2">
					<button
						class="flex items-center gap-2 rounded-md bg-black px-2 py-1 text-sm text-white shadow hover:bg-zinc-800 dark:bg-white dark:text-black hover:dark:bg-zinc-200"
						onclick={() => onselect && onselect(model)}
					>
						<Laptop class="size-4 " /> Use</button
					>
				</div>
			{:else}
				<Download {model} />
			{/if}
		{/if}

		{#if model.provider !== 'ollama'}
			<button
				class="flex items-center gap-2 rounded-md bg-black px-2 py-1 text-sm text-white shadow hover:bg-zinc-800 dark:bg-white dark:text-black hover:dark:bg-zinc-200"
				onclick={() => onselect && onselect(model)}
			>
				<Cloud class="size-4 " />
				Use</button
			>
		{/if}
	</footer>
</article>
