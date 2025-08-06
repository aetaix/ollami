<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';

	let { message } = $props();
</script>

<div class="mb-4">
	{#each message.parts as part, partIndex (partIndex)}
		{#if part.type === 'text'}
			<div class="prose prose-base dark:prose-invert max-w-none">
				<SvelteMarkdown source={part.text} />
			</div>
		{/if}
	{/each}
</div>
