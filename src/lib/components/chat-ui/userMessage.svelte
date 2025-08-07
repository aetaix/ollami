<script lang="ts">
	let { message } = $props();
</script>

<div class="mb-4">
	{#each message.parts as part, partIndex (partIndex)}
		{#if part.type === 'text'}
			<div class="flex justify-end">
				<div class="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-3">{part.text}</div>
			</div>
		{/if}
	{/each}
</div>
