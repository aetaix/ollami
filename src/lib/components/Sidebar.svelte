<script lang="ts">
	import { page } from '$app/state';
	import { chats, deleteChat } from '$lib/stores/chatsStorage';
	import { PanelRight, MessageSquare, Plus, Trash, Search, Layers, Smile } from '@lucide/svelte';
	import ToggleMode from './sidebar-ui/ToggleMode.svelte';
	import Settings from './Settings.svelte';
	import { fly } from 'svelte/transition';
	import Ollami from './custom-icons/Ollami.svelte';

	let { ontogglesidebar } = $props();

	let pathname = $derived(page.url.pathname);

	let search = $state('');

	// Avoid mutating the original chats store when sorting
	const orderedChats = $derived(
		$chats
			.filter((chat) => chat.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
			.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
	);

	let posY = $state(0);
	let height = $state(0);
	let navEl: HTMLElement | null = null;

	$effect(() => {
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
			posY = rect.top - 17;
			height = rect.height;
		}
	});
</script>

<aside
	transition:fly={{ x: -320, duration: 200 }}
	class="fixed top-0 left-0 z-50 h-screen w-[320px] p-4"
>
	<nav
		bind:this={navEl}
		aria-label="Sidebar"
		class="relative flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-gradient-to-tl from-zinc-100 to-transparent p-2 pt-0 shadow-[0_5px_20px_#00000017] backdrop-blur-2xl transition-colors dark:border-zinc-800 dark:from-zinc-800/50"
	>
		<div class="flex flex-col gap-2">
			<div
				style:height={height + 'px'}
				style:transform={`translateY(${posY}px)`}
				class=" pointer-events-none absolute right-2 left-2 origin-bottom rounded-xl bg-white shadow-[0_5px_20px_#00000017] transition-all ease-in-out dark:bg-zinc-800"
			></div>
			<div class="relative flex items-center justify-between pt-2 pl-2">
				<Ollami size={64} aria-label="Ollami" />
				<button
					onclick={ontogglesidebar}
					class="rounded-lg p-2 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
				>
					<PanelRight size={17} />
				</button>
			</div>
			<div
				id="chat-list"
				aria-label="Chat list"
				role="button"
				tabindex="0"
				class="relative flex flex-col gap-2 rounded-2xl p-2 transition-colors

				{pathname.includes('/chat/') || pathname === '/' ? '' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}"
			>
				<div class="flex items-center justify-between gap-2">
					<div
						class="flex items-center gap-1 rounded-lg border border-zinc-200 px-2 py-1 outline-zinc-400 transition-colors focus-within:bg-transparent focus-within:outline hover:bg-zinc-100 dark:border-zinc-700 dark:outline-zinc-600 dark:hover:bg-zinc-700"
					>
						<Search size={20} />
						<input
							bind:value={search}
							type="text"
							placeholder="Search in {$chats.length} Chats"
							class="w-full border-none bg-none p-1 text-sm placeholder:text-zinc-400 focus:outline-none dark:placeholder:text-zinc-500"
						/>
					</div>
					<a
						aria-label="Start a new chat"
						href="/"
						class="flex items-center justify-center gap-1 rounded-lg bg-zinc-100 p-2 text-sm transition-colors hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600"
						><Plus size={16} /> New</a
					>
				</div>

				<ul class="flex max-h-[414px] flex-col items-stretch gap-2 overflow-y-auto">
					{#if orderedChats.length === 0}
						<li class="text-center text-sm opacity-50">No chats available</li>
					{/if}

					{#each orderedChats as chat (chat.id)}
						<li
							class="group flex w-full items-center justify-between gap-1 rounded-lg pr-1 transition-colors
						{pathname === `/chat/${chat.id}`
								? 'bg-zinc-100 dark:bg-zinc-700'
								: 'hover:bg-zinc-100 dark:hover:bg-zinc-700'}
						"
						>
							<a
								aria-current={pathname === `/chat/${chat.id}` ? 'page' : undefined}
								href={`/chat/${chat.id}`}
								class="flex flex-grow items-center gap-2 truncate p-2 text-ellipsis"
							>
								<MessageSquare size={18} class="shrink-0 text-zinc-500" />
								<span class=" truncate text-sm"> {chat.name}</span>
							</a>
							<button
								aria-label={`Delete chat ${chat.name}`}
								class="flex h-6 w-6 shrink-0 translate-y-0.5 items-center justify-center rounded opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
								onclick={(e) => {
									e.stopPropagation();
									deleteChat(chat.id);
								}}
							>
								<Trash size={16} />
							</button>
						</li>
					{/each}
				</ul>
			</div>
			<a
				id="models"
				href="/models"
				aria-current={pathname === '/models' ? 'page' : undefined}
				class="relative flex items-center gap-2 rounded-lg px-3 py-2
			{pathname === '/models' ? '' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}
			"
			>
				<Layers size={16} class="opacity-50" />
				Models</a
			><a
				id="companions"
				href="/companions"
				aria-current={pathname === '/companions' ? 'page' : undefined}
				class="relative flex items-center gap-2 rounded-lg px-3 py-2
			{pathname === '/companions' ? '' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}
			"
			>
				<Smile size={16} class="opacity-50" />
				Companions</a
			>
		</div>

		<div class="flex items-center justify-between">
			<Settings />
			<ToggleMode />
		</div>
	</nav>
</aside>
