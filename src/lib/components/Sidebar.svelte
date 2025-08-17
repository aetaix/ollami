<script lang="ts">
	import { page } from '$app/state';
	import { chats, deleteChat } from '$lib/stores/chatsStorage';

	import { PanelRight, MessageSquare, Plus, Trash } from '@lucide/svelte';
	import ToggleMode from './sidebar-ui/ToggleMode.svelte';
	import Settings from './Settings.svelte';
	import { fly } from 'svelte/transition';
	import Ollami from './custom-icons/Ollami.svelte';

	let { ontogglesidebar } = $props();

	// Avoid mutating the original chats store when sorting
	const orderedChats = $derived(
		[...$chats].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
	);

	let posY = $state(0);
	let height = $state(0);
	let navEl: HTMLElement | null = null;

	function moveBackground(event: MouseEvent | KeyboardEvent) {
		const element = event.currentTarget as HTMLElement | HTMLAnchorElement;
		if (!navEl) return;
		const targetRect = element.getBoundingClientRect();
		posY = targetRect.top - 25;
		height = targetRect.height;
	}

	$effect(() => {
		const pathname = page.url.pathname;
		if (!navEl) return;
		let element: HTMLElement | null = null;

		if (pathname.startsWith('/chat/') || pathname === '/') {
			// Highlight the chat element
			element = document.getElementById('chat-list');
		} else if (pathname === '/models') {
			// Highlight the models element
			element = document.getElementById('models');
		} else if (pathname === '/companions') {
			// Highlight the companions element
			element = document.getElementById('companions');
		}

		if (element) {
			const rect = element.getBoundingClientRect();
			posY = rect.top - 25;
			height = rect.height;
		}
	});
</script>

<aside
	transition:fly={{ x: -320, duration: 200 }}
	class="fixed top-0 left-0 z-50 h-screen w-[320px] p-4 "
>
	<nav
		bind:this={navEl}
		aria-label="Sidebar"
		class="relative flex h-full flex-col justify-between transition-colors rounded-2xl bg-white/10 border-glass p-2 shadow backdrop-blur-2xl  dark:bg-zinc-800/50"
	>
		<div class="flex flex-col gap-2">
			<div
				style:height={height + 'px'}
				style:transform={`translateY(${posY}px)`}
				class="pointer-events-none absolute right-2 left-2 origin-top rounded-xl border-glass bg-white shadow transition-all ease-in-out dark:bg-zinc-800"
			></div>
			<div class="relative flex items-center justify-between pt-2 pl-2">
				<Ollami size={64} aria-label="Ollami" />
				<button
					onclick={ontogglesidebar}
					class="rounded-lg p-2 transition-colors hover:bg-white hover:shadow-none dark:hover:bg-zinc-800"
				>
					<PanelRight size={20} />
				</button>
			</div>
			<div
				id="chat-list"
				aria-label="Chat list"
				role="button"
				tabindex="0"
				onclick={moveBackground}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') moveBackground(e);
				}}
				class="relative flex flex-col gap-2 p-2"
			>
				<div class="flex items-center justify-between gap-2">
					<h2 class=" text-sm opacity-50">Chats</h2>
					<a
						aria-label="Start a new chat"
						href="/"
						class="flex items-center justify-center gap-1 rounded-lg bg-zinc-100 p-2 text-sm transition-colors hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600"
						><Plus size={16} /> New</a
					>
				</div>

				<ul class="flex max-h-[400px] flex-col items-stretch gap-2 overflow-y-auto">
					{#if orderedChats.length === 0}
						<li class="text-center text-sm opacity-50">No chats available</li>
					{/if}

					{#each orderedChats as chat (chat.id)}
						<li
							class="group flex w-full items-center justify-between gap-1 rounded-lg transition-colors
						{page.url.pathname === `/chat/${chat.id}`
								? 'bg-zinc-100 dark:bg-zinc-700'
								: 'hover:bg-zinc-100 dark:hover:bg-zinc-700'}
						"
						>
							<a
								aria-current={page.url.pathname === `/chat/${chat.id}` ? 'page' : undefined}
								href={`/chat/${chat.id}`}
								class="flex flex-grow items-center gap-1 truncate p-2 text-ellipsis"
							>
								<MessageSquare size={18} class="shrink-0" />
								<span class=" text-sm"> {chat.name}</span>
							</a>
							<button
								aria-label={`Delete chat ${chat.name}`}
								class="shrink-0 translate-y-0.5 p-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
								onclick={(e) => {
									e.stopPropagation();
									deleteChat(chat.id);
								}}
							>
								<Trash size={18} />
							</button>
						</li>
					{/each}
				</ul>
			</div>
			<a
				id="models"
				href="/models"
				onclick={moveBackground}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') moveBackground(e);
				}}
				aria-current={page.url.pathname === '/models' ? 'page' : undefined}
				class="relative rounded-lg px-3 py-2
			{page.url.pathname === '/models' ? '' : 'hover:bg-white dark:hover:bg-zinc-800'}
			">Models</a
			><a
				id="companions"
				href="/companions"
				onclick={moveBackground}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') moveBackground(e);
				}}
				aria-current={page.url.pathname === '/companions' ? 'page' : undefined}
				class="relative rounded-lg px-3 py-2
			{page.url.pathname === '/companions' ? '' : 'hover:bg-white dark:hover:bg-zinc-800'}
			">Companions</a
			>
		</div>

		<div class="flex items-center justify-between">
			<Settings />
			<ToggleMode />
		</div>
	</nav>
</aside>
