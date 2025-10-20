<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Placeholder } from '@tiptap/extensions';

	let {
		content = $bindable(''),
		onsubmit
	}: {
		content: string;
		onsubmit: (event: Event) => void;
	} = $props();

	let element = null as HTMLElement | null;
	let editor = null as Editor | null;

	onMount(() => {
		try {
			editor = new Editor({
				element: element,
				extensions: [
					StarterKit,
					Placeholder.configure({
						placeholder: 'Ask something ...',
						emptyEditorClass: 'is-empty', // Add a class when editor is empty
						emptyNodeClass: 'is-empty-node' // Add a class to empty nodes
					})
				],
				content: content,
				autofocus: true,
				editorProps: {
					attributes: {
						class: 'focus:outline-none max-h-44 min-h-16 overflow-y-auto p-1'
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
		} catch (error) {
			console.error('Failed to initialize editor:', error);
		}
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div bind:this={element}></div>

<style>
	:global {
		.is-empty::before {
			content: attr(data-placeholder);
			float: left;
			color: #adb5bd;
			pointer-events: none;
			height: 0;
		}
	}
</style>
