<script>
  import ollama from "ollama";
  import { goto } from "$app/navigation";
  import { currentModel, models } from "$lib/stores/models";
  export let model = {};

  function setCurrentModel() {
    currentModel.set(model);
    goto("/");
  }

  let loading = false;
  function installModel() {
    console.log("installing", model.image);

    ollama
      .pull({
        model: model.image,
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

<h2 class="flex gap-2 items-center mb-4">
  <img src="/icons/models/{model.icon || 'model.svg'}" class="w-5" alt="" />
  <span class="text-black-400">{model.name} /</span>
  <span class="font-semibold">{model.image}</span>
</h2>

<p class="text-sm text-black-600 mb-4">{model.description}</p>

{#if model.installed}
  <button
    on:click={setCurrentModel}
    class="bg-white border border-black-200 shadow px-3 py-2 font-semibold text-sm rounded-lg mb-4"
    >Chat with model</button
  >
{:else}
  <button
    on:click={installModel}
    class="bg-white border border-black-200 shadow px-3 py-2 font-semibold text-sm rounded-lg mb-4"
    >Install model</button
  >
{/if}

<table class="w-full text-left text-sm">
  <tr class="border-b border-black-200">
    <td class="text-black-800 py-2">Parameters</td>
    <td class="text-black-400 py-2 w-3/4">{model.parameters}</td>
  </tr>
  <tr class="border-b border-black-200">
    <td class="text-black-800 py-2">Size</td>
    <td class="text-black-400 py-2 w-3/4">{model.size}GB</td>
  </tr>
</table>
