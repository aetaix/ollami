<script lang="ts">
	import { generateId } from 'ai';
	import { goto } from '$app/navigation';
	import { chats } from '$lib/stores/chatsStorage';
	import { getSelectedModel } from '$lib/stores/models.svelte';
	import Input from '$lib/components/chat-ui/Input.svelte';
	// import WidgetZone from '$lib/components/widgets/WidgetZone.svelte';

	let input = '';

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
				model: getSelectedModel(),
				createdAt: new Date().toISOString(),
				messages: [{ id: generateId(), role: 'user', parts: [{ type: 'text', text: content }] }]
			}
		]);

		goto(`/chat/${id}`);
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4">
	<div class="grid grid-cols-6 gap-4 w-full max-w-2xl">
		<div class=" col-span-2 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800">
			<h1 class="text-3xl">Ollami!</h1>
			<p>Welcome, ask something!</p>
		</div>
		<div class="col-span-4 ">
			<div class="rounded-2xl text-zinc-500 bg-zinc-50 p-4 dark:bg-zinc-800 h-full flex items-center justify-center">
				Add a widget
			</div>
		</div>
	</div>
	<Input bind:input {onsubmit} />
</div>
