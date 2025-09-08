<script lang="ts">
	import { copyToClipboard } from '$lib/utils/copy-paste';
	import { Clipboard, Check } from '@lucide/svelte';
	let { message } = $props();

	let isCopied = $state(false);

	function copy() {
		copyToClipboard(message.parts[0].text);
		isCopied = true;
		setTimeout(() => {
			isCopied = false;
		}, 2000);
	}
</script>

<div class="group flex flex-col gap-2">
	{#each message.parts as part, partIndex (partIndex)}
		{#if part.type === 'text'}
			<div class="flex justify-end">
				<div class="rounded-xl bg-zinc-200/50 p-3 dark:bg-zinc-800">{part.text}</div>
			</div>
		{/if}
	{/each}
	<div
		class="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100"
	>
		<button
			onclick={copy}
			class="flex size-8 items-center justify-center rounded-md bg-zinc-50 hover:bg-zinc-200"
		>
			{#if isCopied}
				<Check size={16} />
			{:else}
				<Clipboard size={16} />
			{/if}
		</button>
	</div>
</div>
