<script lang="ts">
	let { message } = $props();
</script>

<div class="mb-4">
	{#each message.parts as part, partIndex (partIndex)}
		{#if part.type === 'text'}
			<div class="">{part.text}</div>
		{/if}
	{/each}
</div>
