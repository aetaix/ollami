<script lang="ts">
	import ollama from 'ollama';

	let { model } = $props();

    let isDownloading = $state(false);
    let progress = $state(0);

	async function pullModel() {
        isDownloading = true;
		const modelName = model.api;
		const response = await ollama.pull({
			model: modelName,
			stream: true
		});
		console.log(response);
		for await (const part of response) {
			console.log(part);
            progress = Math.round(part.completed / part.total * 100);

			//{
			// "status": "pulling a3de86cd1c13",
			// "digest": "sha256:a3de86cd1c132c822487ededd47a324c50491393e6565cd14bafa40d0b8e686f",
			// "total": 5225374496,
			// "completed": 2824595558

             if (progress === 1) {
                isDownloading = false;
            }
		}
	}
</script>

<button onclick={pullModel} class="text-sm opacity-50 hover:opacity-100">
	{model.name}
    
    {#if isDownloading}
        {progress} %
    {/if}
</button>
