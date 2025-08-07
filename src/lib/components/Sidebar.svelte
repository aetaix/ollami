<script lang="ts">
	import { page } from '$app/state';
	import { chats, deleteChat } from '$lib/stores/chatsStorage';
	import { PanelRight, MessageSquarePlus, MessageSquare, Trash } from '@lucide/svelte';
	import ToggleMode from './sidebar-ui/ToggleMode.svelte';
	import Settings from './Settings.svelte';
	import { fly } from 'svelte/transition';
	import Ollami from './custom-icons/Ollami.svelte';

	let { ontogglesidebar } = $props();

	const orderedChats = $derived(
		$chats.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
	);
</script>

<aside
	transition:fly={{ x: -320, duration: 200 }}
	class="fixed top-0 left-0 z-50 h-screen w-[320px] p-4"
>
	<nav
		class="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-neutral-100/90 p-4 shadow backdrop-blur-3xl dark:border-zinc-700 dark:bg-zinc-900/70"
	>
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<Ollami size={64} />
				<button
					onclick={ontogglesidebar}
					class="rounded-lg p-2 transition-colors hover:bg-white hover:shadow-none dark:hover:bg-zinc-800"
				>
					<PanelRight size={20} />
				</button>
			</div>
			<div>
				<a
					href="/"
					class="flex items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm shadow transition-colors hover:bg-neutral-50 hover:shadow-none dark:border-zinc-700 dark:bg-neutral-900 dark:hover:bg-zinc-800"
					><MessageSquarePlus size={20} /> New Chat</a
				>
			</div>

			<div>
				<h2 class="mb-2 text-sm opacity-50">Chats</h2>
				<ul class="flex flex-col items-stretch gap-2">
					{#each orderedChats as chat}
						<li
							class="group flex w-full items-center justify-between gap-1 rounded-lg transition-colors
						{page.url.pathname === `/chat/${chat.id}`
								? 'bg-white dark:bg-zinc-800'
								: 'hover:bg-neutral-50 dark:hover:bg-zinc-800'}
						"
						>
							<a href={`/chat/${chat.id}`} class="flex flex-grow items-center gap-1 p-2">
								<MessageSquare size={18} />
								<span class="truncate text-sm"> {chat.name}</span>
							</a>
							<button
								class="shrink-0 translate-y-0.5 p-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
								onclick={() => deleteChat(chat.id)}
							>
								<Trash size={18} />
							</button>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="flex items-center justify-between">
			<Settings />
			<ToggleMode />
		</div>
	</nav>
</aside>
