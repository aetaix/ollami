<script>
  import { models } from "$lib/stores/models";
  import { rag, files } from "$lib/stores/files";
  import File from "$lib/components/icons/File.svelte";
  import Check from "../icons/Check.svelte";

  export let id;

  let loading = false;
  let success = false;
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
    loading = true;
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
        loading = false;
        success = true;
        setTimeout(() => {
          success = false;
        }, 2000);
      });
  }
</script>

{#if loading}
  <div class="w-8 h-8 flex justify-center items-center">
    <span class="loader text-purple-600"></span>
  </div>
{:else if success}
  <div class="w-8 h-8 animate-success rounded-full flex justify-center items-center bg-purple-600 text-white">
    <Check class="w-5" />
  </div>
{:else}
  <button
    on:click|preventDefault={upload}
    class="w-8 h-8 rounded-full hover:bg-black-100 dark:hover:bg-black-500 transition-colors flex justify-center items-center"
  >
    <File class="w-5" />
  </button>
{/if}
<input
  on:change={saveFile}
  bind:this={inputFile}
  type="file"
  id="file"
  class="hidden"
  accept=".pdf,.txt,.doc,.docx,.csv,.pptx"
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
    content: "";
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
