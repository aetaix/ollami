<script lang="ts">
	import { Select } from 'bits-ui';

	import {
		getSelectedModel,
		models,
		setSelectedModel,
		type Model
	} from '$lib/stores/models.svelte';
	import { ArrowUp, ChevronDown } from '@lucide/svelte';
	import InputTextarea from './input-textarea.svelte';
	import { Check } from '@lucide/svelte';
	let {
		input = $bindable(''),
		onsubmit
	}: {
		input: string;
		onsubmit: (e: Event) => void;
	} = $props();

	function handleModelChange(value: string) {
		const model = models.find((m) => m.api === value) as Model;
		setSelectedModel(model);
	}
</script>

<form
	{onsubmit}
	class="flex w-full max-w-2xl flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-2 shadow dark:border-zinc-700 dark:bg-zinc-900"
>
	<InputTextarea bind:content={input} {onsubmit} />

	<div class="flex items-center justify-between">
		{#if models}
			<Select.Root type="single" onValueChange={handleModelChange}>
				<Select.Trigger
					class="touch-none flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2 text-sm shadow transition-colors select-none"
					aria-label="Select a theme"
				>
					{getSelectedModel().name}
					<ChevronDown size={16} />
				</Select.Trigger>
				<Select.Portal>
					<Select.Content
						class="focus-override z-50 w-[300px] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-lg"
						align="start"
						sideOffset={8}
					>
						<Select.Viewport class="">
							{#each models as model, i (i + model.name)}
								<Select.Item
									class="rounded-button data-highlighted:bg-muted flex h-10 w-full items-center py-3 pr-1.5 pl-5 text-sm capitalize outline-hidden select-none data-disabled:opacity-50"
									value={model.api}
									label={model.name}
								>
									{#snippet children({ selected })}
										{model.name}
										{#if selected}
											<div class="ml-auto">
												<Check aria-label="check" />
											</div>
										{/if}
									{/snippet}
								</Select.Item>
							{/each}
						</Select.Viewport>
					</Select.Content>
				</Select.Portal>
			</Select.Root>
		{/if}
		<button type="submit" class="rounded-lg bg-zinc-900 p-2 text-white">
			<ArrowUp size={20} />
		</button>
	</div>
</form>
