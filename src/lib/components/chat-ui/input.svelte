<script lang="ts">
	import { ArrowUp } from '@lucide/svelte';
	import InputTextarea from './InputTextarea.svelte';
	import InputModels from './InputModels.svelte';
	import InputCompanions from './InputCompanions.svelte';

	let { input = $bindable(''), onsubmit, model = $bindable(), companion = $bindable() } = $props();
</script>

<form
	{onsubmit}
	class="flex w-full max-w-2xl flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-2 shadow dark:border-zinc-700 dark:bg-zinc-800"
>
	<InputTextarea bind:content={input} {onsubmit} />

	<div class="flex items-center justify-between">
		<div class="flex justify-start gap-2">
			<InputCompanions bind:companion />
		</div>

		<div class="flex items-center justify-end gap-2">
			<InputModels bind:model />
			<button
				type="submit"
				disabled={!input}
				class="rounded-lg p-2 transition-colors {input
					? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
					: 'bg-zinc-100 text-zinc-400 dark:bg-zinc-700/50 dark:text-zinc-600'}"
			>
				<ArrowUp size={20} />
			</button>
		</div>
	</div>
</form>
