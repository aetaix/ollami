<script>
  import { models } from "$lib/stores/models";
  import { modalModelsOpen } from "$lib/stores/states";
  let name = "";
  let model = "";
  let prompt = "";

  async function createNewModel() {
    const { data } = await fetch("/api/create-model", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        model: model,
        prompt: prompt,
      }),
    });
    close();
  }

  function close() {
    modalModelsOpen.set(false);
  }
</script>

{#if $modalModelsOpen}
  <div
    class="bg-black/50 fixed top-0 left-0 bottom-0 right-0 z-50 flex justify-center items-center"
  >
    <div class="w-full max-w-xl border-black-600 bg-black-700 p-4 rounded-xl">
      <header class="flex justify-between items-center">
        <h2 class="text-xl">Create a derived model</h2>
        <button on:click={close}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_21_8696)">
              <path
                d="M12 10.5862L16.95 5.63623L18.364 7.05023L13.414 12.0002L18.364 16.9502L16.95 18.3642L12 13.4142L7.04999 18.3642L5.63599 16.9502L10.586 12.0002L5.63599 7.05023L7.04999 5.63623L12 10.5862Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_21_8696">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </header>
      <div class="mt-4">
        <label for="newModelName" class="block mb-2">Model Name</label>
        <input
          bind:value={name}
          id="newModelName"
          type="text"
          class="w-full p-2 border border-black-600 bg-transparent rounded-md"
        />

        <label for="model" class="block mb-2 mt-4">Model</label>
        <p class="text-xs mb-2 opacity-70">
          Select your base model for creating a derivation
        </p>
        <select
          bind:value={model}
          class="w-full p-2 border border-black-600 bg-transparent rounded-md"
        >
          {#each $models as model}
            <option value={model.image}
              >{model.name} - {model.parameters}</option
            >
          {/each}
        </select>

        <label for="prompt" class="block mb-2 mt-4">Prompt</label>
        <p class="text-xs mb-2 opacity-70">
          Enter a prompt for the model to start with
        </p>
        <textarea
          bind:value={prompt}
          id="prompt"
          type="text"
          class="w-full p-2 border border-black-600 bg-transparent rounded-md"
        ></textarea>

        <button
          on:click={createNewModel}
          class="mt-4 w-full p-2 border border-black-600 rounded-md bg-black-800 hover:bg-green"
          >Create</button
        >
      </div>
    </div>
  </div>
{/if}
