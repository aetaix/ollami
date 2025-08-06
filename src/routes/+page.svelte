<script lang="ts">
	import { generateId } from 'ai';
	import { goto } from '$app/navigation';
	import { chats } from '$lib/stores/chatsStorage';
    import { models } from '$lib/stores/models.svelte';

	let input = $state('');
    let selectedModel = $state(models[0]);

	function handleSubmit(e: Event) {
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
                model: selectedModel,
                createdAt: new Date().toISOString(),
				messages: [
                    { id: generateId(), 
                    role: 'user', 
                    parts: [
                        { type: 'text', text: content }
                    ] }
                ]
			}
		]);

		goto(`/chat/${id}`);
	}
</script>

<main>
	<form onsubmit={handleSubmit}>

        <select name="model" id="model" bind:value={selectedModel.api}>
            {#each models as model}
                <option value={model.api}>{model.name}</option>
            {/each}
        </select>
        
		<input bind:value={input} />
		<button type="submit">Send</button>
	</form>
</main>
