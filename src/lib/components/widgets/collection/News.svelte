<script lang="ts">
	import { getSelectedModel } from '$lib/stores/models.svelte';
    	import SvelteMarkdown from '@humanspeak/svelte-markdown';

	// import { onMount } from 'svelte';
	import { Completion } from '@ai-sdk/svelte';

	const sdk = new Completion({
		api: '/api/widgets/news',
        body: {
            model: getSelectedModel(),
            countryCode: 'it'
        }
	});

	// onMount(() => {
	// 	sdk.handleSubmit();
	// });
</script>

<div
	class="rounded-lg border prose prose-base border-zinc-200 bg-white p-2 shadow dark:border-zinc-700 dark:bg-zinc-800 max-h-[300px] overflow-y-scroll"
>
	<button class="hover:bg-amber-50" onclick={() => sdk.complete('')}>refresh</button>
    <SvelteMarkdown source={sdk.completion} />
</div>
