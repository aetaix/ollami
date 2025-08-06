<script lang="ts">
	let { message } = $props();
</script>

<div class="mb-4">
	{#each message.parts as part, partIndex (partIndex)}
		{#if part.type === 'text'}
			<div class="flex justify-end">
				<div class="rounded-lg bg-neutral-100 p-2">{part.text}</div>
			</div>
		{/if}
	{/each}
</div>
