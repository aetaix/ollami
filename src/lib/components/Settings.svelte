<script lang="ts">
	import { Dialog, Tabs } from 'bits-ui';
	const settings = [
		{
			label: 'General',
			value: 'general',
			content: 'General settings content goes here.'
		},
		{
			label: 'Account',
			value: 'account',
			content: 'Account settings content goes here.'
		},
		{
			label: 'Billing',
			value: 'billing',
			content: 'Billing settings content goes here.'
		}
	];
</script>

<Dialog.Root>
	<Dialog.Trigger class="text-sm opacity-50 hover:opacity-100">Settings</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
		<Dialog.Content
			class="fixed top-[50%] left-[50%] z-50 w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800"
		>
			<Tabs.Root class="grid grid-cols-6">
				<Tabs.List class="col-span-2 flex flex-col border-r border-zinc-200 p-4">
					<h3 class="mb-4 text-lg">Settings</h3>
					{#each settings as setting}
						<Tabs.Trigger class="text-left text-sm" value={setting.label}>
							{setting.label}
						</Tabs.Trigger>
					{/each}
				</Tabs.List>
				{#each settings as setting}
					<Tabs.Content class="col-span-4" value={setting.label}>
						<div class="p-4">
							{setting.content}
						</div>
					</Tabs.Content>
				{/each}
			</Tabs.Root>
			<Dialog.Close class="absolute top-4 right-4 text-sm">Close</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
