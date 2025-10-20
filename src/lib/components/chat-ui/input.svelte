<script lang="ts">
	import { Select, Popover } from 'bits-ui';
	import { models } from '$lib/stores/models.svelte';
	import { companions, type Companion } from '$lib/stores/companionsStorage';
	import { ArrowUp, ChevronDown, Plus, Smile } from '@lucide/svelte';
	import InputTextarea from './InputTextarea.svelte';
	import { fly } from 'svelte/transition';

	let { input = $bindable(''), onsubmit, model = $bindable(), companion = $bindable() } = $props();

	// Models

	const currentModel = $derived(model || models.selectedModel);

	function getModelFromValue(value: string): App.Model | undefined {
		const [modelName, modelParameters] = value.split(':');
		return models.models.find(
			(m) => m.api === modelName && (!modelParameters || m.parameters === modelParameters)
		);
	}

	function handleModelChange(value: string) {
		const selectedModel = getModelFromValue(value);
		if (selectedModel) {
			models.selectedModel = selectedModel;
		}
	}

	function getModelDisplayName(model: App.Model): string {
		return model.parameters
			? `${model.name} (${model.parameters})`
			: model.provider === 'ollama'
				? `${model.name} (Latest)`
				: model.name;
	}

	// Companions

	let companionModalOpen = $state(false);

	function handleSelectCompanion(comp: Companion | null) {
		if (comp === null) {
			companion = null;
			companionModalOpen = false;
			return;
		}
		const selectedCompanion = $companions.find((c) => c.id === comp.id);
		if (selectedCompanion) {
			companion = selectedCompanion;
		}
		companionModalOpen = false;
	}
</script>

{#snippet selectItem(model: App.Model)}
	<Select.Item
		class="flex w-full items-center gap-2 rounded-lg p-2 text-sm outline-hidden transition-colors select-none hover:bg-zinc-100 data-selected:bg-zinc-100 data-selected:text-zinc-700 dark:hover:bg-zinc-700 dark:data-selected:bg-zinc-700 dark:data-selected:text-white"
		value={model.api + (model.parameters ? ':' + model.parameters : '')}
		label={getModelDisplayName(model)}
	>
		<img src={`/provider-icons/${model.icon}`} alt={model.name} class="size-5 object-contain" />
		{getModelDisplayName(model)}
		{#if model.reasoning}
			<span class="rounded bg-blue-500/10 p-1 py-0 text-xs text-blue-500">Reasoning</span>
		{/if}
	</Select.Item>
{/snippet}

<form
	{onsubmit}
	class="flex w-full max-w-2xl flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-2 shadow dark:border-zinc-700 dark:bg-zinc-800"
>
	<InputTextarea bind:content={input} {onsubmit} />

	<div class="flex items-center justify-between">
		<div class="flex justify-start gap-2">
			{#if $companions.length > 1}
				<Popover.Root bind:open={companionModalOpen}>
					<Popover.Trigger
						class="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white p-2 text-sm shadow transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
					>
						<Smile size={16} />
						{companion ? companion.name : 'Pick an agent'}
					</Popover.Trigger>
					<Popover.Portal>
						<Popover.Content sideOffset={8} align="start" forceMount>
							{#snippet child({ wrapperProps, props, open })}
								{#if open}
									<div {...wrapperProps}>
										<div
											{...props}
											transition:fly={{ y: -10, duration: 100 }}
											class="w-[160px] rounded-lg border-2 border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
										>
											<button
												class="flex w-full items-center gap-2 rounded-lg p-2 text-sm outline-hidden transition-colors select-none hover:bg-zinc-100 data-selected:bg-zinc-100 data-selected:text-zinc-700 dark:hover:bg-zinc-700 dark:data-selected:bg-zinc-700 dark:data-selected:text-white"
												onclick={() => handleSelectCompanion(null)}
											>
												No companion
											</button>
											{#each $companions as comp}
												<button
													class="flex w-full items-center gap-2 rounded-lg p-2 text-sm outline-hidden transition-colors select-none hover:bg-zinc-100 data-selected:bg-zinc-100 data-selected:text-zinc-700 dark:hover:bg-zinc-700 dark:data-selected:bg-zinc-700 dark:data-selected:text-white"
													onclick={() => handleSelectCompanion(comp)}
													>{comp.name}
												</button>
											{/each}
										</div>
									</div>
								{/if}
							{/snippet}
						</Popover.Content>
					</Popover.Portal>
				</Popover.Root>
			{/if}
		</div>

		<div class="flex items-center justify-end gap-2">
			{#if models.models.length > 1}
				<Select.Root type="single" onValueChange={handleModelChange}>
					<Select.Trigger
						class="flex touch-none items-center gap-2 rounded-lg bg-zinc-100 p-2 text-sm transition-colors select-none hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
						aria-label="Select a model"
					>
						{#if currentModel?.icon}
							<img
								src={`/provider-icons/${currentModel.icon}`}
								alt={currentModel.name}
								class="size-5 object-contain"
							/>
						{/if}
						{currentModel ? getModelDisplayName(currentModel) : 'Select a model'}
						<ChevronDown size={16} />
					</Select.Trigger>
					<Select.Portal>
						<Select.Content
							class="focus-override z-50 w-[300px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
							align="start"
							sideOffset={8}
							forceMount
						>
							{#snippet child({ wrapperProps, props, open })}
								{#if open}
									<div {...wrapperProps}>
										<div {...props} transition:fly={{ y: -10, duration: 100 }}>
											<Select.Viewport class="max-h-[252px] overflow-y-auto p-2">
												<div class="mb-2 border-b border-zinc-200 pb-2 dark:border-zinc-700">
													<header class="flex items-center justify-between p-2">
														<h4 class="text-sm text-zinc-500 dark:text-zinc-400">Local models</h4>
														<a href="/models">+</a>
													</header>

													{#each models.models.filter((model) => model.provider === 'ollama' && model.installed) as model, i (i + model.name)}
														{@render selectItem(model)}
													{/each}
												</div>

												<h4 class="text-sm text-zinc-500 dark:text-zinc-400">API</h4>
												{#each models.models.filter((model) => model.provider !== 'ollama') as model, i (i + model.name)}
													{@render selectItem(model)}
												{/each}
											</Select.Viewport>
										</div>
									</div>
								{/if}
							{/snippet}
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
	</div>
</form>
