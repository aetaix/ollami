<script lang="ts">
	import { generateId } from 'ai';
	import { goto } from '$app/navigation';
	import { chats } from '$lib/stores/chatsStorage';
	import { models } from '$lib/stores/models.svelte';
	import Input from '$lib/components/chat-ui/Input.svelte';
	import { scale } from 'svelte/transition';
	import Ollami from '$lib/components/custom-icons/Ollami.svelte';
	let input = $state('');
	let companion = $state(null);

	function onsubmit(e: Event) {
		e.preventDefault();
		const id = generateId();

		if (!input) return;
		const userMessage = input;
		input = '';
		chats.update((chats) => [
			...chats,
			{
				id,
				name: userMessage,
				model: models.selectedModel,
				createdAt: new Date().toISOString(),
				messages: [{ id: generateId(), role: 'user', parts: [{ type: 'text', text: userMessage }] }]
			}
		]);
		goto(`/chat/${id}`);
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4">
	<div class="grid w-full max-w-2xl grid-cols-8 gap-4">
		<div
			in:scale={{ duration: 200 }}
			class="col-span-3 h-full rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800"
		>
			<h1 class="flex items-center gap-2 text-3xl">
				<Ollami size={72} />!
			</h1>
			<p>Your local AI gateway.</p>
		</div>
	</div>
	<Input bind:input {onsubmit} bind:companion />
</div>
