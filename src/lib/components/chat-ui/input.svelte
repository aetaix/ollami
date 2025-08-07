<script lang="ts">
	import {
		getSelectedModel,
		models,
		setSelectedModel,
		type Model
	} from '$lib/stores/models.svelte';
	import { ArrowUp } from '@lucide/svelte';
	import InputTextarea from './input-textarea.svelte';
	let {
		input = $bindable(''),
		onSubmit
	}: {
		input: string;
		onSubmit: (e: Event) => void;
	} = $props();

	function handleModelChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		const model = models.find((m) => m.api === target.value) as Model;
		setSelectedModel(model);
	}
</script>

<form
	onsubmit={onSubmit}
	class="w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-2 shadow dark:border-zinc-700 dark:bg-zinc-900"
>
	<InputTextarea bind:content={input} onsubmit={onSubmit} />

	<div class="flex items-center justify-between">
		{#if models}
			<select value={getSelectedModel().api} onchange={handleModelChange}>
				{#each models as model}
					<option value={model.api}>{model.name}</option>
				{/each}
			</select>
		{/if}
		<button type="submit" class="rounded-lg bg-zinc-900 p-2 text-white">
			<ArrowUp size={20} />
		</button>
	</div>
</form>
