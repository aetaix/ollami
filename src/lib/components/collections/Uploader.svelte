<script>
	import { models } from '$lib/stores/models';
	import { collections } from '$lib/stores/collections';
    import Plus from '../icons/Plus.svelte';

    export let name = '';

	let loading = false;
	let success = false;
	let count = 0;
	let inputFile;
	function upload() {
		inputFile.click();
	}

	async function addFile() {
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

		formData.append('name', name);

		try {
			fetch('/api/files/add', {
				method: 'POST',
				body: formData
			})
				.then((res) => res.json())
				.then(async (data) => {
					console.log(data.newFiles);

					// update the collections store
					collections.update((c) => {
						c.forEach((col) => {
							if (col.name === name) {
								col.files = [...col.files, ...data.newFiles];
								col.updated_at = new Date().toISOString();
							}
						});
						return c;
					});

					localStorage.setItem('collections', JSON.stringify($collections));

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

{#if !loading}
<button
	on:click={upload}
	class="p-2  text-sm rounded hover:bg-black-100 flex justify-center items-center gap-2 {$$props.class}"
>
	<Plus class="w-5" />
	Add File
</button>
{:else}

<div class="flex p-2 gap-2 items-center text-sm {$$props.class}">
    <div class="loader"></div>
    Uploading...
</div>
{/if}


<input
	on:change={addFile}
	bind:this={inputFile}
	type="file"
	id="file"
	class=" sr-only"
	accept=".pdf,.txt,.docx,.csv,.pptx"
	multiple
/>

<style>
    /* HTML: <div class="loader"></div> */
.loader {
  width: 16px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid #973bf2;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}
@keyframes l20-1{
   0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
   12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
   25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
   50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
   100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
}
@keyframes l20-2{ 
  0%    {transform:scaleY(1)  rotate(0deg)}
  49.99%{transform:scaleY(1)  rotate(135deg)}
  50%   {transform:scaleY(-1) rotate(0deg)}
  100%  {transform:scaleY(-1) rotate(-135deg)}
}
</style>