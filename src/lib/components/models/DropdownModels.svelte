<script>
  import { models, currentModel } from "$lib/stores/models";
  import Chevron from "../icons/Chevron.svelte";

  let dropdown = {
    state: false,
    open: () => {
      dropdown.state = true;
    },
    close: () => {
      dropdown.state = false;
    },
  };

  function setCurrentModel(model) {
    currentModel.set(model);
    dropdown.close();
  }

  function clickOutside(element, callbackFunction) {
    function onClick(event) {
      if (!element.contains(event.target)) {
        callbackFunction();
      }
    }

    document.body.addEventListener("click", onClick);

    return {
      update(newCallbackFunction) {
        callbackFunction = newCallbackFunction;
      },
      destroy() {
        document.body.removeEventListener("click", onClick);
      },
    };
  }
</script>

<div class="relative w-full opening-animation">
  <button
    on:click|stopPropagation={dropdown.open}
    class="text-sm flex items-center justify-between w-full border border-black-200 dark:border-black-600 gap-2 bg-white dark:bg-black-700 rounded-xl transition-shadow hover:shadow px-4 pr-2 py-3 shadow"
  >
    <div class="flex items-center gap-2">
     
      <img
        src="/icons/models/{$currentModel.icon || 'model.svg'}"
        alt=""
        class="w-5"
      />
      <p>
        <span class="text-black-400 font-mono">{$currentModel.name}/</span>
        <span class="font-semibold">{$currentModel.image}</span>
      </p>
   
    </div>
    <Chevron />
  </button>
  {#if dropdown.state}
    <div
      use:clickOutside={dropdown.close}
      class="absolute top-12 bg-white dark:bg-black-700 shadow-lg rounded-xl mt-2 p-2 w-full border border-black-200 dark:border-black-600"
    >
      {#if $models.filter(model => model.installed).length <= 1}
        <div class="h-32 flex flex-col justify-center items-center">
            <p class="text-black-400 mb-2">No other models available yet</p>
            <a href="/models" class="border border-black-200 px-3 py-2 rounded-md hover:bg-black-100 transition-colors">Add more models</a>
        </div>
      {:else}
        {#each $models as model}
          {#if model.installed && model.name !== $currentModel.name}
            <button
              on:click={() => setCurrentModel(model)}
              class="flex items-center gap-2 p-2 w-full hover:bg-black-100 dark:hover:bg-black-600 rounded-md cursor-pointer"
            >
              <img
                src="/icons/models/{model.icon || 'model.svg'}"
                alt=""
                class="w-5"
              />
              <p class="text-sm">
                <span class="text-black-400 font-mono">{model.name}/</span>
                <span class="font-semibold">{model.image}</span>
              </p>
            </button>
          {/if}
        {/each}
      {/if}
    </div>
  {/if}
</div>

<style>
  .opening-animation {
    animation: open 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  @keyframes open {
    from {
      opacity: 0;
      transform:  scaleX(0.2);
    }
    to {
      opacity: 1;
      transform: scaleX(1);
    }
  }
</style>