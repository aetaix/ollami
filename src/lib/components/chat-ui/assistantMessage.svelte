<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import CodeBlock from './parts/CodeBlock.svelte';
	import Reasoning from './parts/Reasoning.svelte';

	let { message } = $props();
</script>

<div>
	{#each message.parts as part, partIndex (partIndex)}
		{#if part.type === 'reasoning'}
			<Reasoning text={part.text} />
		{/if}
		{#if part.type === 'text'}
			<div class="prose prose-base max-w-none dark:prose-invert">
				<SvelteMarkdown source={part.text} renderers={{ code: CodeBlock }} />
			</div>
		{/if}
	{/each}
</div>
