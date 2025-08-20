<script lang="ts">
	import Highlight from 'svelte-highlight';
	import { github } from 'svelte-highlight/styles';
	import { typescript } from 'svelte-highlight/languages';

	// Explicit props using $props (optional, but more controlled)
	let { text, lang = 'typescript', className = '' } = $props();

	// Reactive state (if needed)
	let count = $state(0); // Example, not used here

	// Derived style (memoized)
	let highlightStyle = $derived(github);

	// Derived language config (with fallback)
	let languageConfig = $derived(
		{
			typescript,
			javascript: typescript
		}[lang] || typescript
	);
</script>

<svelte:head>
	{@html highlightStyle}
</svelte:head>

<div
	class={`
		not-prose overflow-hidden rounded-2xl border
		border-zinc-200 bg-zinc-100 text-sm shadow
		dark:border-zinc-600 dark:bg-zinc-700
		${className}
	`}
>
	<header class="border-b border-zinc-200 bg-zinc-100 p-2">
		<h3 class="font-mono text-xs text-zinc-500">{lang}</h3>
	</header>

	<Highlight language={languageConfig} code={text} />
</div>
