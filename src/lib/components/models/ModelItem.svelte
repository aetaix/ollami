<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { currentModel, models } from '$lib/stores/models';
	import ModelSize from './ModelSize.svelte';
	import Trash from '../icons/Trash.svelte';
	import StarLine from '../icons/StarLine.svelte';
	import StartFill from '../icons/StartFill.svelte';

	export let name = '';
	export let image = '';
	export let icon = '';
	export let parameters = '';
	export let description = '';
	export let tags = [];
	export let size = 0;
	export let popularity = 1;
	export let installed = false;
	export let fav = false;
	let loading = false;
	let progress = 0;

	$: {
		if (browser) {
			// check local storage if there is an installation queue running
			const queue = JSON.parse(localStorage.getItem('queue') || '[]');
			// if the model is in the queue and is not already installed, set loading to true esle remove it from the queue
			if (queue.includes(image) && !installed) {
				loading = true;
			} else {
				localStorage.setItem('queue', JSON.stringify(queue.filter((item) => item !== image)));
			}
		}
	}

	function setCurrentModel() {
		currentModel.set({ name, image, icon, description, tags, size, installed, parameters });
		goto('/');
	}

	async function installModel() {
		loading = true;

		// Add the model to the installation queue
		const queue = JSON.parse(localStorage.getItem('queue') || '[]');

		localStorage.setItem('queue', JSON.stringify([...queue, image]));

		const stream = await fetch('/api/models/pull', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ image })
		});

		const reader = stream.body.getReader();
		const decoder = new TextDecoder();

		reader.read().then(function processText({ done, value }) {
			if (done) {
				console.log('Done!');
				progress = 100;
				loading = false;
				installed = true;
				localStorage.setItem('queue', JSON.stringify(queue.filter((item) => item !== image)));
				return;
			}
			const data = decoder.decode(value || new Uint8Array(), {
				stream: !done
			});
			progress = parseFloat(data);

			return reader.read().then(processText);
		});
	}

	function setFavorite() {
		// change current fav model to false

		models.update((models) =>
			models.map((model) => ({
				...model,
				fav: model.image === image
			}))
		);

		// update local storage

		localStorage.setItem('fav-model', image);
	}

	async function deleteModel() {
		await fetch('/api/models/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ image })
		});
		models.update((models) =>
			models.map((model) => {
				if (model.image === image) {
					model.installed = false;
				}
				return model;
			})
		);
	}
</script>

<div
	class="bg-white dark:bg-black-700 border border-black-200 dark:border-black-600 hover:shadow-lg transition-shadow rounded-xl p-4"
>
	<header class="flex items-center justify-between mb-4">
		<div class="flex items-center gap-2">
			<img src="/icons/models/{icon}" alt={name} class="w-4 h-4" />

			<h2 class="text-sm">
				<span class="font-semibold">{name}</span><span
					class="font-mono ml-1 text-black-500 dark:text-black-200">{parameters}</span
				>
			</h2>
		</div>

		{#if installed}
			<div class="flex items-center justify-end gap-2">
				{#if !tags.includes('embeddings')}
					{#if fav}
						<button
							on:click={setFavorite}
							class=" w-8 h-8 flex justify-center items-center rounded bg-yellow-400 text-white transition-all"
						>
							<StartFill class="w-4" />
						</button>
					{:else}
						<button
							on:click={setFavorite}
							class=" w-8 h-8 flex justify-center items-center rounded bg-black-100 dark:bg-black-600 hover:bg-black-500 dark:hover:bg-black-500 hover:text-white transition-all"
						>
							<StarLine class="w-4" />
						</button>
					{/if}
					<button
						on:click={setCurrentModel}
						class="border bg-green-500 hover:bg-green border-green-300 transition-colors text-white shadow px-2 py-1 rounded-md text-sm"
					>
						Chat
					</button>
				{/if}

				<button
					on:click={deleteModel}
					class=" w-8 h-8 flex justify-center items-center rounded bg-black-100 dark:bg-black-600 hover:bg-red dark:hover:bg-red hover:text-white transition-all"
				>
					<Trash class="w-4" />
				</button>
			</div>
		{:else if loading}
			<div class="flex items-center gap-2">
				<svg width="20" stroke="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
					><g class="spinner_V8m1"
						><circle
							cx="12"
							cy="12"
							r="9.5"
							fill="none"
							stroke-width="3"
							class=" stroke-green-500"
						/></g
					></svg
				>
				<span class="text-xs">{progress}%</span>
			</div>
		{:else}
			<button
				on:click={installModel}
				class="border border-black-200 dark:border-black-500 bg-white dark:bg-black-600 px-2 py-1 rounded-md text-sm"
			>
				Install
			</button>
		{/if}
	</header>
	<p class="text-sm text-black-500 dark:text-black-200">{description}</p>
	<footer class="flex items-center justify-between mt-4">
		<div class="flex items-center gap-1">
			{#each tags as tag}
				<span
					class="text-xs text-black-500 dark:text-black-300 border border-black-200 px-2 py-1 rounded-full"
					>{tag}</span
				>
			{/each}
			<span class="text-xs ml-1"
				>{popularity > 1000 ? popularity / 1000 + 'M' : popularity + 'K'} Pulls</span
			>
		</div>
		<ModelSize {size} />
	</footer>
</div>

<style>
	.spinner_V8m1 {
		transform-origin: center;
		animation: spinner_zKoa 2s linear infinite;
	}
	.spinner_V8m1 circle {
		stroke-linecap: round;
		animation: spinner_YpZS 1.5s ease-in-out infinite;
	}
	@keyframes spinner_zKoa {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes spinner_YpZS {
		0% {
			stroke-dasharray: 0 150;
			stroke-dashoffset: 0;
		}
		47.5% {
			stroke-dasharray: 42 150;
			stroke-dashoffset: -16;
		}
		95%,
		100% {
			stroke-dasharray: 42 150;
			stroke-dashoffset: -59;
		}
	}
</style>
