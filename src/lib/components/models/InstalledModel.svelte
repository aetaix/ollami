<script>
  import ollama from "ollama";
  import { models, currentModel} from "$lib/stores/models";
  import { dropdownModelsOpen } from "$lib/stores/states";

  export let model = {};

  async function setModel(image) {
    currentModel.set($models.find((model) => model.image === image));
    dropdownModelsOpen.set(false);
  }

  function deleteModel(image) {
    ollama.delete({ model: image }).then(() => {
      models.update((models) => {
        return models.map((model) => {
          if (model.image === image) {
            return { ...model, installed: false };
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
  <button
    on:click={() => {
      setModel(model.image);
    }}
    class="w-full capitalize p-2 text-left flex items-center gap-2"
  >
    {#if $currentModel.image === model.image}
      <span class="w-3 h-3 block rounded-full bg-green"></span>
    {/if}
    <span>{model.name}</span>
    <span class="bg-black-200 dark:bg-black-600 rounded p-1 text-xs">{model.parameters}</span>
    <span class="text-xs bg-black-100 dark:bg-black-900 p-1 rounded">{model.size}GB</span>
  </button>

  <button
    on:click|stopPropagation={() => {
      deleteModel(model.image);
    }}
    class="px-2 opacity-0 group-hover:opacity-100"
  >
    <svg
      width="24"
      height="18"
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
</li>
