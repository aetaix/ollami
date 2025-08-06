<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';

	let { message } = $props();
</script>

<div class="mb-4">
	{#each message.parts as part, partIndex (partIndex)}
		{#if part.type === 'text'}
			<div class="prose prose-base max-w-none dark:prose-invert">
				<SvelteMarkdown source={part.text} />
			</div>
		{/if}
	{/each}
</div>
