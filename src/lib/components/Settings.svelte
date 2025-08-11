<script lang="ts">
	import ollama from 'ollama';
	import { staticOllamaModels } from '$lib/models/ollama';
	import { Dialog } from 'bits-ui';
	import Download from './setting-ui/models/download.svelte';


</script>

<Dialog.Root>
	<Dialog.Trigger class="text-sm opacity-50 hover:opacity-100">Settings</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
		<Dialog.Content
			class="fixed top-[50%] left-[50%] z-50 w-full max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800"
		>
			<Dialog.Title class="text-lg">Settings</Dialog.Title>
			<Dialog.Description>Update your local Ollami</Dialog.Description>
			<div>
				{#each staticOllamaModels as model}
					<Download {model} />
				{/each}
			</div>
			<Dialog.Close />
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
