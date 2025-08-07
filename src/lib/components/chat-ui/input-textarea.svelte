<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';

	let {
		content = $bindable(''),
		onsubmit
	}: {
		content: string;
		onsubmit: (e: Event) => void;
	} = $props();

	let element = null as HTMLElement | null;
	let editor = null as Editor | null;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: content,
			autofocus: true,
			editorProps: {
				attributes: {
					class: 'focus:outline-none max-h-44 overflow-y-auto p-1'
				},
				handleKeyDown: (view, event) => {
					if (event.key === 'Enter' && !event.shiftKey) {
						event.preventDefault();
						onsubmit(event);
						editor?.commands.clearContent();
						return true;
					}
					return false;
				}
			},
			onUpdate: ({ editor }) => {
				content = editor.getText();
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
