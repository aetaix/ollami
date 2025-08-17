<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { ollamaModels } from '$lib/models/ollama';
	import { mistralModels } from '$lib/models/mistral';
	import { openaiModels } from '$lib/models/openai';
	import TabContent from '$lib/components/models-ui/TabContent.svelte';
	const modelTabs = [
		{
			value: 'ollama',
			label: 'Ollama',
			models: [...ollamaModels]
		},
		{
			value: 'mistral',
			label: 'Mistral AI',
			models: [...mistralModels]
		},
		{
			value: 'openai',
			label: 'OpenAI',
			models: [...openaiModels]
		}
	];
</script>

<div class="flex h-screen flex-col p-4 pl-0">
	<div
		class="h-full w-full rounded-2xl border border-zinc-200 bg-white shadow dark:border-zinc-700 dark:bg-zinc-800"
	>
		<header class="flex flex-col items-start p-5">
			<h1 class="text-xl">Models</h1>
			<p class="text-sm text-zinc-500">
				Browse and install a curated collection of AI models. All Ollama models are not available in
				Ollami. We curated a selection of models that are small, fast, and efficient.
			</p>
		</header>
		<Tabs.Root value={modelTabs[0].value}>
			<Tabs.List class="flex gap-8 border-b border-zinc-200 px-5 dark:border-zinc-700">
				{#each modelTabs as tab}
					<Tabs.Trigger
						value={tab.value}
						class="border-b-2 border-b-transparent pb-3 data-[state=active]:border-b-zinc-700"
					>
						{tab.label}
					</Tabs.Trigger>
				{/each}
			</Tabs.List>
			{#each modelTabs as tab}
				<Tabs.Content value={tab.value}>
					<TabContent {tab} />
				</Tabs.Content>
			{/each}
		</Tabs.Root>
	</div>
</div>
