<script>
	import '../app.css';

	import { browser } from '$app/environment';
	import { models, currentModel } from '$lib/stores/models';
	import { companions } from '$lib/stores/companions';
	import { collections } from '$lib/stores/collections';
	import Sidebar from '$lib/components/Sidebar.svelte';
	export let data;

	// Load all models from the Ollama API
	$: models.set(data.props.models);

	// Load all companions from the localstorage and set it to the companions store
	$: if (browser && $models) {
		if (!localStorage.getItem('companions')) {
			localStorage.setItem('companions', JSON.stringify([]));
		} else {
			companions.set(JSON.parse(localStorage.getItem('companions')));
		}

		if ($collections.length === 0 && localStorage.getItem('collections')) {
			collections.set(JSON.parse(localStorage.getItem('collections')));
		}

		// Fav
		if (!localStorage.getItem('fav-model')) {
			currentModel.set($models.find((model) => model.fav));
			localStorage.setItem('fav-model', JSON.stringify([]));
		} else {
			const favModel = localStorage.getItem('fav-model');
			// set the models to fav model and to current model

			models.update((models) =>
				models.map((model) => ({
					...model,
					fav: model.image === favModel
				}))
			);

			currentModel.set($models.find((model) => model.image === favModel));
		}
	}
</script>

<main class="flex">
	<Sidebar />
	<slot />
</main>
