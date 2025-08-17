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
<div
	class=" not-prose overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 text-sm shadow dark:border-zinc-600 dark:bg-zinc-700"
>
	<header class="border-b border-zinc-200 bg-zinc-100 p-2">
		<h3 class="font-mono text-xs text-zinc-500">{props.lang}</h3>
	</header>
	<Highlight language={typescript} code={text} />
</div>
