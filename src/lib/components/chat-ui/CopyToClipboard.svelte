<script lang="ts">
	import { copyToClipboard } from '$lib/utils/copy-paste';
	import { Clipboard, Check } from '@lucide/svelte';
	let isCopied = $state(false);
	let { message } = $props();

	function copy() {
		if (message.parts.length === 0) return;
		const consolidatedText = message.parts.map((part: { text: string }) => part.text).join('\n\n');
		copyToClipboard(consolidatedText);
		isCopied = true;
		setTimeout(() => {
			isCopied = false;
		}, 2000);
	}
</script>

<button
	onclick={copy}
	class="flex size-8 items-center justify-center rounded-md transition-colors hover:bg-zinc-100"
>
	{#if isCopied}
		<Check size={16} />
	{:else}
		<Clipboard size={16} />
	{/if}
</button>
