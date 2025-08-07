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
			content: '',
			autofocus: true,
			editorProps: {
				attributes: {
					class: 'focus:outline-none'
				},
				handleKeyDown: (view, event) => {
					if (event.key === 'Enter' && !event.shiftKey) {
						event.preventDefault();
						onsubmit(event);
                    // element?.dispatchEvent(enterEvent);
					}
					return false;
				}
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				content = editor?.getText() || '';
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
