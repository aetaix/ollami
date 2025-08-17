<script lang="ts">
	import { generateId } from 'ai';
	import { goto } from '$app/navigation';
	import { chats } from '$lib/stores/chatsStorage';
	import { getSelectedModel } from '$lib/stores/models.svelte';
	import Input from '$lib/components/chat-ui/input.svelte';
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

<div class="flex h-full w-full flex-col items-center justify-center gap-2">
	<Input bind:input {onsubmit} />
</div>
