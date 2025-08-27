<script lang="ts">
	import { Globe, Laptop, Trash } from '@lucide/svelte';
	import ollama from 'ollama';
	import Download from './Download.svelte';
	let { model } = $props();

	function deleteModel(model: App.Model) {
		ollama.delete({ model: model.api }).then(() => {
			model.installed = false;
		});
	}
</script>

<article
	class="group flex flex-col gap-8 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800"
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
				<div class="flex items-center gap-2">
					<span class="text-sm text-zinc-400">Installed</span>
					<button onclick={() => deleteModel(model)} class="w-0 h-8 shrink group-hover:scale-100 transition-all rounded group-hover:w-8 flex justify-center items-center bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700">
						<Trash class="size-4 text-zinc-700" />
					</button>
				</div>
			{:else}
				<Download {model} />
			{/if}
		{/if}
	</footer>
</article>
