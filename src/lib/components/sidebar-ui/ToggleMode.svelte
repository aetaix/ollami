<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { SunIcon, MoonIcon } from '@lucide/svelte';
	import { mode, setMode} from 'mode-watcher';
	let x = new Spring(0);

	const modes = [
		{
			name: 'light',
			icon: SunIcon
		},
		{
			name: 'dark',
			icon: MoonIcon
		}
	] as const;

	function set(mode: 'light' | 'dark') {
		if (mode === 'light') {
			setMode(mode);
			x.target = 0;
		} else if (mode === 'dark') {
			setMode(mode);
			x.target = 100;
		}
	}
</script>

<div
	class="relative flex items-center gap-px rounded-lg border border-zinc-200 p-px dark:border-zinc-700"
>
	<div
		class="absolute left-0 h-full rounded-[7px] border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700"
		style="transform: translateX({x.current}%); width: calc(100% / {modes.length})"
	></div>

	{#each modes as { name, icon }}
		<button
			class="opacity-50 hover:opacity-100 {mode.current === name
				? 'opacity-100'
				: ''} relative px-2 py-1 transition-colors"
			onclick={() => set(name)}
		>
			<svelte:component this={icon} size={16} class=" " />
		</button>
	{/each}

	<span class="sr-only">Toggle theme</span>
</div>
