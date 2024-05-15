<script>
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { models } from '$lib/stores/models';
	import { collections } from '$lib/stores/collections';
	import Clipboard from '../icons/Clipboard.svelte';
	import Check from '../icons/Check.svelte';
	import Tooltip from './Tooltip.svelte';

	let active = $models.some((model) => model.tags.includes('embeddings') && model.installed);
	let loading = false;
	let success = false;
	let count = 0;
	let inputFile;
	const dispatch = createEventDispatcher();

	function upload() {
		inputFile.click();
	}

	// When inputFile changes, use the embedding api to save the file and embed it, then use the answer to properly update the local storage with te meta data

	function saveFile() {
		loading = true;
		const inputFiles = inputFile.files;
		count = inputFiles.length;
		//const file = inputFile.files[0];
		const formData = new FormData();

		for (let i = 0; i < inputFiles.length; i++) {
			formData.append('files', inputFiles[i]);
			formData.append('fileName', inputFiles[i].name);
		}

		formData.append(
			'image',
			$models.filter((m) => m.tags.includes('embeddings') && m.installed)[0]?.image
		);

		try {
			fetch('/api/files/load', {
				method: 'POST',
				body: formData
			})
				.then((res) => res.json())
				.then(async (data) => {
					console.log(data.collection);
					data.collection.created_at = new Date().toISOString();
					collections.update((c) => [...c, data.collection]);
					localStorage.setItem('collections', JSON.stringify($collections));

					dispatch('uploaded', { collection: data.collection.name });

					loading = false;
					success = true;
					setTimeout(() => {
						success = false;
					}, 2000);
				});
		} catch (error) {
			console.error(error);
		}
	}
</script>

{#if loading}
	<div class="w-7 h-7 shrink-0 flex justify-center items-center">
		<span class="loader text-black-900" />
	</div>
{:else if success}
	<div
		class="w-7 h-7 shrink-0 animate-success rounded-full flex justify-center items-center bg-green-500 text-white"
	>
		<Check class="w-5" />
	</div>
{:else if !active}
	<button
		type="button"
		class="text-black-300 group dark:text-black-600 dark:bg-black-800 bg-black-100 cursor-default
w-7 h-7 rounded-full relative transition-colors flex justify-center items-center"
	>
		<Tooltip />
		<Clipboard class="w-5" />
	</button>
{:else}
	<button
		on:click|preventDefault={upload}
		class=" hover:bg-black-100 dark:hover:bg-black-500 w-7 h-7 rounded-full relative transition-colors flex justify-center items-center"
	>
		<Clipboard class="w-5" />
		{#if count > 0 && !$page.url.pathname.includes('chat')}
			<span
				class="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center"
			>
				{count}
			</span>
		{/if}
	</button>
{/if}
<input
	on:change={saveFile}
	bind:this={inputFile}
	type="file"
	id="file"
	class=" sr-only"
	accept=".pdf,.txt,.docx,.csv,.pptx"
	multiple
/>

<style>
	.loader {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		position: relative;
		animation: rotate 1s linear infinite;
	}
	.loader::before {
		content: '';
		box-sizing: border-box;
		position: absolute;
		inset: 0px;
		border-radius: 50%;
		border: 3px solid;
		animation: prixClipFix 2s linear infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes prixClipFix {
		0% {
			clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
		}
		25% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
		}
		50% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
		}
		75% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
		}
		100% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
		}
	}

	.animate-success {
		animation: success 0.3s;
	}

	@keyframes success {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
