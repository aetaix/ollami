<script lang="ts">
	let { message } = $props();
</script>

<div>
	{#each message.parts as part, partIndex (partIndex)}
		{#if part.type === 'text'}
			<div class="flex justify-end">
				<div class="rounded-xl bg-zinc-200/50 p-3 dark:bg-zinc-800">{part.text}</div>
			</div>
		{/if}
	{/each}
</div>
