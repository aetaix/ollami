<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import { Accordion } from 'bits-ui';
	import CodeBlock from './CodeBlock.svelte';
	import { ChevronDown, Lightbulb } from '@lucide/svelte';
	let { text } = $props();
</script>

<div class="text-sm opacity-50">
	<Accordion.Root type="single">
		<Accordion.Item>
			<Accordion.Header>
				<Accordion.Trigger
					class="flex  w-fit items-center justify-start rounded p-1 transition-all select-none hover:bg-zinc-100 [&[data-state=open]>svg]:rotate-180"
				>
					<div class="flex items-center gap-2">
						<Lightbulb class="h-4 w-4" />
						Thinking
					</div>

					<ChevronDown class="ml-2 h-4 w-4" />
				</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Content
				class="my-4 prose-base overflow-hidden text-sm tracking-[-0.01em] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
			>
				<SvelteMarkdown source={text} renderers={{ code: CodeBlock }} />
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</div>
