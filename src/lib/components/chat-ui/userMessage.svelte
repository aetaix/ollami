<script lang="ts">
	import CopyToClipboard from './CopyToClipboard.svelte';
	let { message } = $props();
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
		class="flex items-center justify-end gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
	>
		<CopyToClipboard {message} />
	</div>
</div>
