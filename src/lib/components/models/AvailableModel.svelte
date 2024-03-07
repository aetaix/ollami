<script>
  import ollama from "ollama";
  import { models } from "$lib/stores/models";
  export let model = {};

  let loading = false;
  function pullModel(image) {
    console.log("pulling", image);
    loading = true;

    ollama
      .pull({
        model: image,
      })
      .then(() => {
        loading = false;
        console.log("done");
        models.update((models) => {
          return models.map((model) => {
            if (model.image === image) {
              return { ...model, installed: true };
            }
            return model;
          });
        });
      });
  }
</script>

<li
  class="group flex items-center justify-between hover:bg-black-100 dark:hover:bg-black-700 transition-colors rounded-md"
>
  <div class="w-full capitalize p-2 text-left flex items-center gap-2">
    <span>{model.name}</span>
    <span class="bg-black-200 dark:bg-black-600 rounded p-1 text-xs">{model.parameters}</span>
    <span class="text-xs bg-black-100 dark:bg-black-900 p-1 rounded">{model.size}GB</span>
  </div>

  {#if !loading}
    <button
      on:click|stopPropagation={() => {
        pullModel(model.image);
      }}
      class="px-2 opacity-0 group-hover:opacity-100">Pull</button
    >
  {:else}
    <button class="mr-2 flex justify-center items-center gap-2 h-full">
      <span class="text-sm">Pulling...</span>
      <span class="loader"></span>
    </button>
  {/if}
</li>

<style>
  .loader {
    width: 14px;
    height: 14px;
    border: 2px solid rgb(161, 103, 212);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
