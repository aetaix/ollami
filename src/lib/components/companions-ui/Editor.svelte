<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import { updateCompanion } from '$lib/stores/companionsStorage';
	import StarterKit from '@tiptap/starter-kit';
	import { Placeholder } from '@tiptap/extensions';

	let {
		id,
		content = $bindable('')
	}: {
		id: string;
		content: string;
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
			content: content,
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

<div bind:this={element}></div>
