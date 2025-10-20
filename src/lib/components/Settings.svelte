<!-- Settings defs
 
-General:
	- Default prompt
	- Favorite model
	- Default companion
	- default chat shortener model (we recommend light model )
- Apparence
	- theme
	- background
- About
-->

<script lang="ts">
	import { Dialog, Tabs } from 'bits-ui';
	import Apparence from './settings-ui/Apparence.svelte';
	import { X } from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';
	import General from './settings-ui/General.svelte';

	const settings = [
		{
			label: 'General',
			value: 'general',
			content: General
		},
		{
			label: 'Apparence',
			value: 'apparence',
			content: Apparence
		}
	];
</script>

<Dialog.Root>
	<Dialog.Trigger
		class="rounded-lg p-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
		>Settings</Dialog.Trigger
	>
	<Dialog.Portal>
		<Dialog.Overlay>
			<div class="fixed inset-0 z-50 bg-white/90 dark:bg-black/80"></div>
		</Dialog.Overlay>
		<Dialog.Content>
			<div
				transition:fly|global={{ y: 20, duration: 200 }}
				class="fixed top-[50%] left-[50%] z-50 h-[400px] w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] rounded-xl border-4 border-zinc-100 bg-white shadow dark:border-zinc-700 dark:bg-zinc-800"
			>
				<Tabs.Root class="grid h-full grid-cols-6">
					<Tabs.List class="col-span-2 flex flex-col border-r border-zinc-200 p-4">
						<h3 class="mb-4 text-lg">Settings</h3>
						{#each settings as setting (setting.label)}
							<Tabs.Trigger
								class="rounded-lg border border-transparent p-2 text-left text-sm hover:bg-neutral-100 data-[state=active]:border-neutral-200 data-[state=active]:bg-white data-[state=active]:shadow"
								value={setting.label}
							>
								{setting.label}
							</Tabs.Trigger>
						{/each}
					</Tabs.List>
					{#each settings as setting (setting.label)}
						<Tabs.Content class="col-span-4 h-full overflow-y-auto" value={setting.label}>
							{#if setting.content}
								<setting.content></setting.content>
							{/if}
						</Tabs.Content>
					{/each}
				</Tabs.Root>
				<Dialog.Close class="absolute top-4 right-4 text-sm">
					<X size={20} />
				</Dialog.Close>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
