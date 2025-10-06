<script lang="ts">
	import { generateId } from 'ai';
	import { goto } from '$app/navigation';
	import { chats } from '$lib/stores/chatsStorage';
	import { defaultCompanion } from '$lib/stores/companionsStorage';
	import { models } from '$lib/stores/models.svelte';
	import Input from '$lib/components/chat-ui/Input.svelte';
	import { scale } from 'svelte/transition';
	// import Clock from '$lib/components/widgets/collection/Clock.svelte';
	// import WidgetZone from '$lib/components/widgets/WidgetZone.svelte';

	let input = $state('');
	let companion = $state(defaultCompanion);

	function onsubmit(e: Event) {
		e.preventDefault();
		const id = generateId();

		if (!input) return;
		const content = input;
		input = '';
		chats.update((chats) => [
			...chats,
			{
				id,
				name: 'New Chat',
				companion: companion,
				model: models.selectedModel,
				createdAt: new Date().toISOString(),
				messages: [{ id: generateId(), role: 'user', parts: [{ type: 'text', text: content }] }]
			}
		]);
		goto(`/chat/${id}`);
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4">
	<div class="grid w-full max-w-2xl grid-cols-8 gap-4">
		<div
			in:scale={{ duration: 200 }}
			class=" col-span-3 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800"
		>
			<h1 class="text-3xl">Ollami!</h1>
			<p>Welcome, ask something!</p>
		</div>
		<div class="col-span-5"></div>
	</div>
	<Input bind:input {onsubmit} bind:companion />
</div>
