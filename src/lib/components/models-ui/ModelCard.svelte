<script lang="ts">
	import { Globe, Laptop } from '@lucide/svelte';
	import Download from './download.svelte';
	let { model } = $props();
</script>

<article
	class="flex flex-col gap-8 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800"
>
	<div>
		<header class="flex items-center justify-between gap-2">
			<div class="flex items-center gap-2">
				<img src="/provider-icons/{model.icon}" alt="" class="size-5" />
				<h3>{model.name}</h3>
			</div>
			{#if model.provider !== 'ollama'}
				<Globe class="size-4 text-zinc-400" />
			{:else}
				<Laptop class="size-4 text-zinc-400" />
			{/if}
		</header>
		<p class="text-sm text-zinc-500">{model.description}</p>
	</div>

	<footer class="flex items-center justify-between">
		<span class="rounded bg-zinc-100 p-1 text-sm capitalize dark:bg-zinc-700">{model.author}</span>
		{#if model.provider === 'ollama'}
			{#if model.installed}
				<span class="text-sm text-green-500">Installed</span>
			{:else}
				<Download model={model} />
			{/if}
		{/if}
	</footer>
</article>
