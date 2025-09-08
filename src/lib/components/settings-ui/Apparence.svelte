<script lang="ts">
    	import { settings } from '$lib/stores/appStorage.svelte';
	async function setBackground(event: Event) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const fileInput = form.elements.namedItem('background') as HTMLInputElement;

		if (!fileInput?.files?.[0]) {
			console.error('No file selected');
			return;
		}

		const formData = new FormData();
		formData.append('background', fileInput.files[0]);

		try {
			const response = await fetch('/api/settings/background', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					`HTTP error! status: ${response.status}`,
					{ cause: errorData }
				);
			}

			const data = await response.json();
			console.log('Upload successful:', data);

			form.reset();

			// Update the settings store with the new background URL
            settings.background = data.path;
		} catch (error) {
			console.error('Upload failed:', error);
			// Consider showing error feedback to the user
			throw error; // Re-throw if you want calling code to handle it
		}
	}
</script>

<div>
	<form onsubmit={setBackground}>
		<label for="background-upload">Choose a background image:</label>
		<input
			id="background-upload"
			type="file"
			name="background"
			accept="image/*"
			required
		/>
		<button type="submit">Save Background</button>
	</form>
</div>