<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import CodeBlock from './CodeBlock.svelte';

	let { message } = $props();
</script>

<div class="mb-4">
	{#each message.parts as part, partIndex (partIndex)}
		{#if part.type === 'text'}
			<div class="prose prose-base max-w-none dark:prose-invert">
				<SvelteMarkdown source={part.text} renderers={{ code: CodeBlock }} />
			</div>
		{/if}
	{/each}
</div>
