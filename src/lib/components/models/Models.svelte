<script>
  import { models, currentModel } from "$lib/stores/models";
  import ModelView from "./ModelView.svelte";

  let search = "";

  let filteredModels = [];
  let selectedModel = $models[0];

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

<div class="grid grid-cols-2 rounded-xl border border-black-200 dark:border-black-600">
  <div class="border-r border-black-200 dark:border-black-600">
    <header class="flex items-center gap-2 border-b border-black-200 dark:border-black-600 p-2">
      <svg width="20"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_21_7844)">
        <path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.867 18 18 14.867 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18ZM19.485 18.071L22.314 20.899L20.899 22.314L18.071 19.485L19.485 18.071Z" fill="currentColor"/>
        </g>
        <defs>
        <clipPath id="clip0_21_7844">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        
      <input
        type="text"
        bind:value={search}
        placeholder="Search models..."
        class="p-1 bg-transparent w-full focus:outline-none"
      />
    </header>
    <ul class="p-2">
      {#each filteredModels as model}
        <li class="
        {selectedModel?.image === model.image
          ? 'bg-black-200 dark:bg-black-600  dark:text-white'
          : 'hover:bg-black-50 dark:hover:bg-black-600 text-black-500 dark:text-black-100 dark:hover:text-white hover:text-black'}
         rounded ">
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
            <span class="text-sm opacity-50"
              >
              {#if $currentModel.image === model.image}
                Running
              {:else}
                {#if model.installed}
                  Installed
                {/if}
              {/if}
              </span
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
