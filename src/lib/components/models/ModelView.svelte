<script>
  import ollama from "ollama";
  import Trash from "../icons/Trash.svelte";
  import Pull from "../icons/Pull.svelte";
  import NewMessage from "../icons/NewMessage.svelte";
  import { goto } from "$app/navigation";
  import { currentModel, models } from "$lib/stores/models";
  export let model = {};

  function setCurrentModel() {
    currentModel.set(model);
    goto("/");
  }

  let loading = false;
  async function installModel() {
    loading = true;

    // Use fetch on api/pull-model to install the model
    const response = await fetch("/api/pull-model", {
      method: "POST",
      body: JSON.stringify({ model: model }),
    });

    for await (const part of response) {
        console.log(part);
    }

    loading = false;
  }

  function deleteModel() {
    ollama.delete({ model: model.image }).then(() => {
      models.update((models) => {
        return models.map((item) => {
          if (item.image === model.image) {
            return { ...item, installed: false };
          }
          return item;
        });
      });
    });
  }
</script>

<header class="flex items-center justify-between mb-4">
  <h2 class="flex gap-2 items-center">
    <img src="/icons/models/{model.icon || 'model.svg'}" class="w-5" alt="" />
    <span class="text-black-400 dark:text-black-100">{model.name} /</span>
    <span class="font-semibold">{model.image}</span>
  </h2>
</header>

<p class="text-sm text-black-600 dark:text-black-300 mb-4">{model.description}</p>

{#if model.installed}
  <div class="flex items-center gap-2 mb-4">
    <button
      on:click={setCurrentModel}
      class="bg-white dark:bg-black-500 border flex items-center gap-2 border-black-200 dark:border-black-400 shadow px-3 py-2 font-semibold text-sm rounded-lg"
    >
      <NewMessage class="w-4" />
      Chat with model</button
    >
    <button
      on:click={deleteModel}
      class="w-8 h-8 bg-black-100 dark:bg-black-600 hover:bg-black-200 rounded flex justify-center items-center"
    >
      <Trash class="w-4" />
    </button>
  </div>
{:else}
  <button
    on:click={installModel}
    class="
    {loading
      ? 'w-full rounded-full h-2 bg-black-100 dark:bg-black-300'
      : 'bg-white dark:bg-black-500 shadow px-3 h-auto py-2 rounded-lg '}
     flex gap-2 items-center border border-black-200 dark:border-black-400 font-semibold text-sm mb-4 transition-all relative"
  >
    {#if !loading}
      <Pull class="w-4" />
      Install model
    {:else}
      <div class="loading bg-black-600 dark:bg-black-300 h-2 rounded-full"></div>
    {/if}
  </button>
{/if}

<table class="w-full text-left text-sm">
  <tr class="border-b border-black-200 dark:border-black-600">
    <td class="text-black-800 dark:text-black-200 py-2">Parameters</td>
    <td class="text-black-400 py-2 w-3/4">{model.parameters}</td>
  </tr>
  <tr class="border-b border-black-200 dark:border-black-600">
    <td class="text-black-800 dark:text-black-200 py-2">Size</td>
    <td class="text-black-400 py-2 w-3/4">{model.size}GB</td>
  </tr>
</table>

<style>
  .loading {
    animation: loading 0.6s linear infinite alternate;
    animation-fill-mode: backwards;
    position: absolute;
    top: 0;
    left: 0;
  }

  @keyframes loading {
    0% {
      width: 10%;
      left: 0;
    }
    50% {
      width: 50%;
      left: 50%;
    }
    100% {
      width: 0%;
      left: 100%;
    }
  }
</style>
