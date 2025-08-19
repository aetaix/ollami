<script lang="ts">
	import { Select } from 'bits-ui';

	import { getSelectedModel, models, setSelectedModel } from '$lib/stores/models.svelte';
	import { ArrowUp, ChevronDown } from '@lucide/svelte';
	import InputTextarea from './InputTextarea.svelte';
	import { Check } from '@lucide/svelte';
	let {
		input = $bindable(''),
		onsubmit
	}: {
		input: string;
		onsubmit: (e: Event) => void;
	} = $props();

	function handleModelChange(value: string) {
		const model = models.find((m) => m.api === value) as App.Model;
		setSelectedModel(model);
	}
</script>

<form
	{onsubmit}
	class="flex w-full max-w-2xl flex-col gap-2 rounded-xl  bg-white border-glass p-2 shadow  dark:bg-zinc-800"
>
	<InputTextarea bind:content={input} {onsubmit} />

	<div class="flex items-center justify-between">
		{#if models}
			<Select.Root type="single" onValueChange={handleModelChange}>
				<Select.Trigger
					class="flex touch-none items-center gap-2 rounded-lg border border-zinc-200 bg-white p-2 text-sm shadow transition-colors select-none dark:border-zinc-700 dark:bg-zinc-800"
					aria-label="Select a theme"
				>
					{getSelectedModel().name}
					<ChevronDown size={16} />
				</Select.Trigger>
				<Select.Portal>
					<Select.Content
						class="focus-override z-50 w-[300px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
						align="start"
						sideOffset={8}
					>
						<Select.Viewport class="">
							{#each models as model, i (i + model.name)}
								<Select.Item
									class="rounded-button data-highlighted:bg-muted flex h-10 w-full items-center py-3 pr-1.5 pl-5 text-sm outline-hidden select-none data-disabled:opacity-50"
									value={model.api}
									label={model.name}
								>
									{#snippet children({ selected })}
										{model.name}
										{#if model.reasoning}
											<span class="rounded bg-blue-50 p-1 text-xs text-blue-500"> Reasoning</span>
										{/if}
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
