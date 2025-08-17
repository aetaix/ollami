<script lang="ts">
	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import github from 'svelte-highlight/styles/github';

	// Props from svelte-markdown
	let { text, ...props } = $props<{
		text: string;
	}>();
</script>

<svelte:head>
	{@html github}
</svelte:head>
<div class=" not-prose rounded-2xl bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 overflow-hidden shadow text-sm">
	<header class="p-2 bg-zinc-100 border-b border-zinc-200">
        <h3 class="font-mono text-xs text-zinc-500">{props.lang}</h3>
    </header>
    <Highlight language={typescript} code={text} />
</div>
