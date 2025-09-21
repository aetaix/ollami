<script lang="ts">
	import { scale } from 'svelte/transition';
	import { Completion } from '@ai-sdk/svelte';
	import { onMount } from 'svelte';

	let { model } = $props();
	const completion = new Completion({
		api: '/api/widgets/clock'
	});

	// onMount(() => {
	// 	completion.complete(
	// 		'Based on the current time, make an interesting comment about the time in one sentence: ' + new Date().toLocaleTimeString(),
	// 		{
	// 			body: {
	// 				model
	// 			}
	// 		}
	// 	);
	// });
</script>

<div
	in:scale={{ duration: 200, delay: 100 }}
	class="h-full rounded-2xl bg-zinc-50 p-4 text-zinc-500 dark:bg-zinc-800"
>
	<!-- hour:min -->
	<h3 class="text-xl">{new Date().toLocaleTimeString()}</h3>
	<p>{completion.completion}</p>
</div>
