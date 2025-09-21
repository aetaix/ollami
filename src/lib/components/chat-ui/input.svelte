<script lang="ts">
	import { Select } from 'bits-ui';
	import {
		models,
		extendedModels,
		getSelectedModel,
		setSelectedModel
	} from '$lib/stores/models.svelte';
	import { ArrowUp, ChevronDown } from '@lucide/svelte';
	import InputTextarea from './InputTextarea.svelte';
	let { input = $bindable(''), onsubmit, model = models[0] } = $props();

	function handleModelChange(value: string) {
		const model = extendedModels.find((m) => m.api === value) as App.Model;
		setSelectedModel(model);
	}

	$effect(() => {
		if (model) {
			setSelectedModel(model);
		}
	});

	const currentModel = $derived(getSelectedModel());
</script>

{#snippet selectItem(model: App.Model)}
	<Select.Item
		class="flex w-full items-center gap-2 rounded-lg p-2 text-sm outline-hidden transition-colors select-none hover:bg-zinc-100 data-selected:bg-zinc-100 data-selected:text-zinc-700 dark:hover:bg-zinc-700 dark:data-selected:bg-zinc-700 dark:data-selected:text-white"
		value={model.api}
		label={model.name}
	>
		<img src={`/provider-icons/${model.icon}`} alt={model.name} class="size-5 object-contain" />
		{model.name}
		{#if model.parameters}
			<span class="rounded bg-indigo-500/10 p-1 text-sm text-indigo-500">{model.parameters}</span>
		{:else if model.provider === 'ollama'}
			<span class="rounded bg-indigo-500/10 p-1 text-sm text-indigo-500">Latest</span>
		{/if}
		{#if model.reasoning}
			<span class="rounded bg-blue-500/10 p-1 text-xs text-blue-500"> Reasoning</span>
		{/if}
	</Select.Item>
{/snippet}

<form
	{onsubmit}
	class="flex w-full max-w-2xl flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-2 shadow dark:border-zinc-700 dark:bg-zinc-800"
>
	<InputTextarea bind:content={input} {onsubmit} />

	<div class="flex items-center justify-between">
		{#if extendedModels}
			<Select.Root type="single" onValueChange={handleModelChange}>
				<Select.Trigger
					class="flex touch-none items-center gap-2 rounded-lg  bg-zinc-100 p-2 text-sm transition-colors select-none hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
					aria-label="Select a theme"
				>
					{#if currentModel?.icon}
						<img
							src={`/provider-icons/${currentModel.icon}`}
							alt={currentModel.name}
							class="size-5 object-contain"
						/>
					{/if}
					{currentModel?.name || 'Select a model'}

					{#if currentModel && currentModel.parameters}
						<span class="rounded bg-indigo-500/10 p-1 text-sm text-indigo-500"
							>{currentModel.parameters}</span
						>
					{:else if currentModel.provider === 'ollama'}
						<span class="rounded bg-indigo-500/10 p-1 text-sm text-indigo-500">Latest</span>
					{/if}

					<ChevronDown size={16} />
				</Select.Trigger>
				<Select.Portal>
					<Select.Content
						class="focus-override z-50 w-[300px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg  dark:border-zinc-700 dark:bg-zinc-800"
						align="start"
						sideOffset={8}
					>
						<Select.Viewport class="max-h-[300px] overflow-y-auto p-2">
							<div class="mb-2 border-b border-zinc-200 pb-2 dark:border-zinc-700">
								<header class="flex items-center justify-between p-2">
									<h4 class="text-sm text-zinc-500 dark:text-zinc-400">Local models</h4>
									<a href="/models">+</a>
								</header>

								{#each extendedModels.filter((model) => model.provider === 'ollama' && model.installed) as model, i (i + model.name)}
									{@render selectItem(model)}
								{/each}
							</div>

							<h4 class="text-sm text-zinc-500 dark:text-zinc-400">API</h4>
							{#each extendedModels.filter((model) => model.provider !== 'ollama') as model, i (i + model.name)}
								{@render selectItem(model)}
							{/each}
						</Select.Viewport>
					</Select.Content>
				</Select.Portal>
			</Select.Root>
		{/if}
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
</form>
