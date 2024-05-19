<script>
	import { collections } from '$lib/stores/collections';
	import { models } from '$lib/stores/models';
	import Collection from './Collection.svelte';

	let active = $models.some((model) => model.tags.includes('embeddings') && model.installed);
	let loading = false;
	let inputFile;

	function upload() {
		inputFile.click();
	}

	// When inputFile changes, use the embedding api to save the file and embed it, then use the answer to properly update the local storage with te meta data

	function createCollection() {
		loading = true;
		const inputFiles = inputFile.files;

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

					loading = false;
					setTimeout(() => {
						success = false;
					}, 2000);
				});
		} catch (error) {
			console.error(error);
		}
	}
</script>

{#if $collections.length === 0}
	<div
		class="flex justify-center flex-grow flex-col items-center border bg-black-50 border-black-200 dark:border-black-600 shadow-sm dark:bg-black-900 rounded-xl"
	>
		<div class="w-full flex-grow flex justify-center items-center">
			<div
				class="bg-white dark:bg-black-700 max-w-md mx-auto shadow-lg rounded-2xl border border-black-200 dark:border-black-600"
			>
				<header class="h-[200px]">
					<img src="/img/db.png" class="w-full h-full object-cover rounded-t-2xl" alt="" />
				</header>
				<div class="p-8">
					<h2 class="font-semibold text-lg">Data context for your chats</h2>
					<p>
						Data collection help your chat give more relevant answer to your queries: submit and put
						your data in context to extend your model capacities beyond its own knowledge.
					</p>
				</div>
				<footer class="pb-8 px-8 flex items-center justify-end">
					<button
						on:click={upload}
						class="bg-black hover:bg-black-800 w-full flex gap-2 justify-center items-center rounded-lg px-3 py-2 text-white"
					>
						{#if loading}
							<div class="w-7 h-7 shrink-0 flex justify-center items-center">
								<span class="loader text-white" />
							</div>

							Creating collection...
						{:else}
							Create your first data collection
						{/if}
					</button>
					<input
						on:change={createCollection}
						bind:this={inputFile}
						type="file"
						id="file"
						class=" sr-only"
						accept=".pdf,.txt,.docx,.csv,.pptx"
						multiple
					/>
				</footer>
			</div>
		</div>
	</div>
{:else}
	<div class="">
		{#each $collections as collection}
			<Collection {collection} />
		{/each}
	</div>
{/if}

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

</style>
