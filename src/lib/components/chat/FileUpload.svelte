<script>
  import { models } from "$lib/stores/models";
  import { rag, files } from "$lib/stores/files";
  import File from "$lib/components/icons/File.svelte";

  export let id;

  let inputFile;

  function upload() {
    // If $models contains at least one model that have the tag "embeddings" and is instaled:true, then upload the file.
    // Otherwise, do nothing.
    if (
      $models.some(
        (model) => model.tags.includes("embeddings") && model.installed
      )
    ) {
      inputFile.click();
    }
  }

  // When inputFile changes, use the embedding api to save the file and embed it, then use the answer to properly update the local storage with te meta data

  function saveFile() {
    const file = inputFile.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    formData.append(
      "image",
      $models.filter((m) => m.tags.includes("embeddings") && m.installed)[0]
        ?.image
    );

    fetch("/api/embedding", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        rag.set(true);
        // update files for each data.ids

        for (let i = 0; i < data.ids.length; i++) {
          files.update((f) => [
            ...f,
            {
              id: data.ids[i],
              chat: id,
              name: file.name,
              collection: data.collection,
              type: file.type,
              size: file.size,
              created_at: new Date().toISOString(),
            },
          ]);
        }
        // Update local storage files with the new file
        localStorage.setItem("files", JSON.stringify($files));
      });
  }
</script>

<button
  on:click|preventDefault={upload}
  class="w-8 h-8 rounded-full hover:bg-black-100 dark:hover:bg-black-500 transition-colors flex justify-center items-center"
>
  <File class="w-5" />
</button>
<input
  on:change={saveFile}
  bind:this={inputFile}
  type="file"
  id="file"
  class="hidden"
  accept=".pdf,.txt,.doc,.docx,.csv"
/>
