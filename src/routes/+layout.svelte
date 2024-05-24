<script>
	import { browser } from '$app/environment';
	import { models, currentModel } from '$lib/stores/models';
	import { companions } from '$lib/stores/companions';
	import { collections } from '$lib/stores/collections';
	import '../app.css';
	export let data;

	// Load all models from the Ollama API
	models.set(data.props.models);

	// Set the current model to the first installed model
	$: if ($models) {
		currentModel.set($models.find((model) => model.installed));
	}

	// Load all companions from the localstorage and set it to the companions store
	$: if (browser) {
		if (!localStorage.getItem('companions')) {
			localStorage.setItem('companions', JSON.stringify([]));
		} else {
			companions.set(JSON.parse(localStorage.getItem('companions')));
		}

		if ($collections.length === 0 && browser && localStorage.getItem('collections')) {
			collections.set(JSON.parse(localStorage.getItem('collections')));
		}
	}
</script>

<slot />
