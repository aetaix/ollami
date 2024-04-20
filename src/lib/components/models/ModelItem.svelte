<script>
  import ollama from "ollama";
  import { goto } from "$app/navigation";
  import { currentModel, models } from "$lib/stores/models";

  export let name = "";
  export let image = "";
  export let icon = "";
  export let description = "";
  export let tags = [];
  export let size = "";
  export let installed = false;

  let sizeColor =
    size < 2 ? "bg-green-100" : size < 5 ? "bg-orange-100" : "bg-red-100";

  /**
   * Model I/O
   */

  let loading = false;

  function setCurrentModel() {
    currentModel.set({ name, image, icon, description, tags, size, installed });
    goto("/");
  }

  async function installModel() {
    loading = true;
    // Use fetch on api/pull-model to install the model
    const response = await fetch("/api/pull-model", {
      method: "POST",
      body: JSON.stringify({ image }),
    });
  }

  function deleteModel() {
    ollama.delete({ model: image }).then(() => {
      models.update((models) => models.filter((model) => model.image !== image));
    });
  }
</script>

<div
  class="bg-white dark:bg-black-700 border border-black-200 hover:shadow-lg transition-shadow rounded-xl p-4"
>
  <header class="flex items-center justify-between mb-4">
    <div class="flex items-center gap-2">
      <img src="/icons/models/{icon}" alt={name} class="w-4 h-4" />

      <h2 class="font-mono text-sm">{name}/{image}</h2>
    </div>

    {#if installed}
      <div class="flex items-center justify-end gap-2">
        <button
          on:click={setCurrentModel}
          class="border bg-green-500 border-green-300 text-white shadow px-2 py-1 rounded-md text-sm"
        >
          Chat
        </button>
        <button
          on:click={deleteModel}
          class="border border-black-200 bg-white px-2 py-1 rounded-md text-sm"
        >
          Delete
        </button>
      </div>
    {:else}
      <button
        on:click={installModel}
        class="border border-black-200 bg-white px-2 py-1 rounded-md text-sm"
      >
        Install
      </button>
    {/if}
  </header>
  <p class="text-sm text-black-500">{description}</p>
  <footer class="flex items-center justify-between mt-4">
    <div class="flex items-center gap-1">
      {#each tags as tag}
        <span
          class="text-xs text-black-500 dark:text-black-300 border border-black-200 px-2 py-1 rounded-full"
          >{tag}</span
        >
      {/each}
    </div>
    <span
      class="text-xs text-black-500 {sizeColor} dark:text-black-300 px-2 py-1 rounded-full"
      >{size}Go</span
    >
  </footer>
</div>
