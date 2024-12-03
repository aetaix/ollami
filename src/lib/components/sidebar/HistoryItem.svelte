<script>
	import { page } from '$app/stores';
	import { history } from '$lib/stores/history';
	import { goto } from '$app/navigation';
	import Trash from '../icons/Trash.svelte';
	import Pencil from '../icons/Pencil.svelte';
	import MessageIcon from '../icons/MessageIcon.svelte';
	export let id = '';
	export let name = '';
	export let model = '';

	function deleteConversation(id) {
		history.update((conversations) => {
			return conversations.filter((conv) => conv.id !== id);
		});

		if ($page.params.id === id) {
			goto('/');
		}
	}

	let editMode = false;
	let input;

	function editModeOn() {
		editMode = true;
		// Focus input
		setTimeout(() => {
			input.focus();
		}, 0);
	}

	function editModeOff() {
		editMode = false;
		renameConversation(id, name);
	}

	function renameConversation(id, name) {
		history.update((conversations) =>
			conversations.map((conv) => (conv.id === id ? { ...conv, name } : conv))
		);
	}
</script>

<li
	class="
        {id === $page.params.id
		? 'dark:bg-black-700 bg-black-100 '
		: ' hover:bg-black-100  dark:hover:bg-black-700'} 
    group group:hover:to-black-700 rounded-lg transition-colors flex justify-between items-center relative"
>
	{#if editMode}
		<input
			bind:this={input}
			on:blur={editModeOff}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					editModeOff();
				}
			}}
			bind:value={name}
			type="text"
			class="border border-black-200 bg-transparent text-sm w-full p-1 focus:outline-black-400 dark:focus:outline-black-200 rounded-md"
		/>
	{:else}
		<a href="/chat/{id}" class="w-full p-2 flex justify-start items-center gap-2">
			{#if id === $page.params.id}
				<div class="shrink-0 text-{model.className ? model.className : 'unknown' }">
					<svg width="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M20 8C20 10.13 19.16 12.16 17.66 13.66C16.16 15.16 14.13 16 12 16V19.5C7 17.5 0 14.5 0 8C0 5.88 0.85 3.85 2.35 2.35C3.85 0.85 5.88 0 8 0H12C14.13 0 16.16 0.85 17.66 2.35C19.16 3.85 20 5.88 20 8Z"
							fill="url(#gradient)"
						/>
						<defs>
							<linearGradient
								id="gradient"
								x1="16"
								y1="14"
								x2="6"
								y2="5.60527e-07"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="currentColor" />
								<stop offset="1" stop-color="currentColor" />
							</linearGradient>
						</defs>
					</svg>
				</div>
			{:else}
				<div class="shrink-0">
					<MessageIcon class="w-5 shrink-0" />
				</div>
			{/if}
			<div class="overflow-hidden min-h-5 flex-grow w-full relative text-sm">
				<span class=" w-[400px] absolute left-0 top-0 bottom-0">{name}</span>
				<div
					class="absolute group-hover:bg-gradient-to-r from-transparent from-60% to-80%
              {id === $page.params.id
						? 'to-black-100 dark:to-black-700'
						: ' dark:to-black-800 group-hover:to-black-100 dark:group-hover:to-black-700 '}
               inset-0"
				/>
			</div></a
		>
	{/if}
	{#if !editMode}
		<button
			on:click={editModeOn}
			class="group-hover:opacity-100 opacity-0 absolute right-6 shrink-0 p-1 mr-2 text-sm text-left text-black dark:text-white hover:bg-black-700/10 dark:hover:bg-black-600 rounded transition-all"
		>
			<Pencil class="w-4" />
		</button>
		<button
			class="group-hover:opacity-100 opacity-0 absolute right-0 shrink-0 p-1 mr-2 text-sm text-left text-black dark:text-white hover:bg-black-700/10 dark:hover:bg-black-600 rounded transition-all"
			on:click={() => deleteConversation(id)}
		>
			<Trash class="w-4" />
		</button>
	{/if}
</li>

<style>
	.text-llama stop:first-child {
		stop-color: #1d90fb;
	}
	.text-llama stop:last-child {
		stop-color: #0b6be1;
	}
	.text-qwen stop:first-child {
		stop-color: hsl(261, 72%, 75%);
	}
	.text-qwen stop:last-child {
		stop-color: #150638;
	}
	.text-mistral stop:first-child {
		stop-color: #f94128;
	}
	.text-mistral stop:last-child {
		stop-color: #ffd738;
	}
	.text-codegemma stop:first-child {
		stop-color: #f9dbbc;
	}
	.text-codegemma stop:last-child {
		stop-color: #468bef;
	}
</style>
