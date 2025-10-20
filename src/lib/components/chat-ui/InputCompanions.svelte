<script lang="ts">
	import { companions, type Companion } from '$lib/stores/companionsStorage';
	import { fly } from 'svelte/transition';
	import { Popover } from 'bits-ui';
	import { Smile } from '@lucide/svelte';

	let { companion = $bindable() } = $props();
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
