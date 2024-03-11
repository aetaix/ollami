<script>
  import { models } from "$lib/stores/models";
  import ModelView from "./ModelView.svelte";

  let search = "";

  let filteredModels = [];
  let selectedModel = null;

  function viewModel(model) {
    selectedModel = model;
  }

  $: if ($models) {
    selectedModel = $models.find((model) => model.image === selectedModel?.image);
  }

  $:filteredModels = $models.filter((model) =>
      model.name.toLowerCase().includes(search.toLowerCase())
    );
  
</script>

<div class="grid grid-cols-2 rounded-xl border border-black-200">
  <div class="border-r border-black-200">
    <header class="flex border-b border-black-200 p-1">
      <input
        type="text"
        bind:value={search}
        placeholder="Search models..."
        class="p-1 bg-transparent w-full focus:outline-none"
      />
    </header>
    <ul class="p-2">
      {#each filteredModels as model}
        <li class="hover:bg-black-100 rounded text-black-500 hover:text-black">
          <button
            on:click={() => {
              viewModel(model);
            }}
            class="flex justify-between w-full items-center p-2"
          >
            <div class="flex items-center gap-2">
              <img
                src="/icons/models/{model.icon || 'model.svg'}"
                alt=""
                class="w-4"
              />
              <span class="text-sm font-mono">{model.image}</span>
            </div>
            <span class="text-sm text-black-400"
              >{model.installed ? "Installed" : ""}</span
            >
          </button>
        </li>
      {/each}
    </ul>
  </div>
  <div class="p-8">
    {#if selectedModel}
      <ModelView model={selectedModel} />
    {:else}
      <div class="flex justify-center items-center h-full">
        <p class="text-black-400">Select a model to view details</p>
      </div>
    {/if}
  </div>
</div>
