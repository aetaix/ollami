<script lang="ts">
	import Highlight from 'svelte-highlight';
	import { mode } from 'mode-watcher';
	import { github, githubDark } from 'svelte-highlight/styles';
	import { typescript } from 'svelte-highlight/languages';
	import { Clipboard, Check } from '@lucide/svelte';
	import { copyToClipboard } from '$lib/utils/copy-paste';

	// Explicit props using $props (optional, but more controlled)
	let { text, lang = 'typescript', className = '' } = $props();

	let isCopied = $state(false);
	// Derived style (memoized)
	let highlightStyle = $derived.by(() => (mode.current === 'dark' ? githubDark : github));

	// Derived language config (with fallback)
	let languageConfig = $derived(
		{
			typescript,
			javascript: typescript
		}[lang] || typescript
	);

	function copy() {
		copyToClipboard(text);
		isCopied = true;
		setTimeout(() => {
			isCopied = false;
		}, 2000);
	}
</script>

<svelte:head>
	{@html highlightStyle}
</svelte:head>

<div
	class={`
		not-prose my-6 overflow-hidden rounded-xl border
		border-zinc-200 bg-zinc-100 text-sm shadow
		dark:border-zinc-600 dark:bg-zinc-700
		${className}
	`}
>
	<header
		class="flex items-center justify-between border-b border-zinc-200 bg-zinc-100 p-2 dark:border-zinc-700 dark:bg-zinc-800"
	>
		<h3 class="font-mono text-xs text-zinc-500">{lang}</h3>
		<button
			class=" flex items-center gap-2 rounded bg-zinc-100 p-1 text-sm text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-700 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
			onclick={copy}
		>
			{#if isCopied}
				<Check size={16} />
				Copied!
			{:else}
				<Clipboard size={16} />
				Copy
			{/if}
		</button>
	</header>

	<Highlight language={languageConfig} code={text} />
</div>
