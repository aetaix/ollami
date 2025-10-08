<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import { updateCompanion, deleteCompanion, type Companion } from '$lib/stores/companionsStorage';
	import StarterKit from '@tiptap/starter-kit';
	import { Placeholder } from '@tiptap/extensions';
	import { Trash } from '@lucide/svelte';

	let {
		id,
		currentCompanion,
		content = $bindable(''),
		ondelete
	}: {
		id: string;
		currentCompanion: Companion;
		content: string;
		ondelete?: (id: string) => void;
	} = $props();

	let element = null as HTMLElement | null;
	let editor = null as Editor | null;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: 'Your prompt'
				})
			],
			content: currentCompanion.system,
			autofocus: true,
			editorProps: {
				attributes: {
					class: 'focus:outline-none max-h-44 overflow-y-auto p-1'
				},
				handleKeyDown: (view, event) => {
					if (event.key === 'Enter' && !event.shiftKey) {
						event.preventDefault();

						return true;
					}
					return false;
				}
			},
			onUpdate: ({ editor }) => {
				content = editor.getText();
				updateCompanion(id, (companion) => {
					if (companion) {
						companion.system = content;
					}
					return companion;
				});
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<header class="p-4">
	<div class="mb-2 flex items-center justify-between">
		<h3 class="block text-sm opacity-50">Name</h3>
		<button
			class="flex size-8 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700"
			aria-label="Delete"
			onclick={() => ondelete?.(currentCompanion?.id)}
		>
			<Trash size={18} />
		</button>
	</div>

	<input
		type="text"
		class="w-full border-b border-zinc-200 pb-1 text-xl transition-colors focus:border-b-zinc-400 focus:outline-none dark:border-zinc-800"
		value={currentCompanion?.name}
		oninput={(e) => {
			const name = (e.target as HTMLInputElement).value;
			if (currentCompanion) {
				updateCompanion(currentCompanion?.id, (companion) => {
					if (companion) {
						companion.name = name;
					}
					return companion;
				});
			}
		}}
	/>
</header>

<div class="p-4">
	<span class="text-sm opacity-50"> System Prompt </span>

	<div bind:this={element}></div>
</div>
