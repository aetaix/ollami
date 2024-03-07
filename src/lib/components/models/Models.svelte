<script>
  import ollama from "ollama";
  import { models } from "$lib/stores/models";
  import AvailableModel from "./AvailableModel.svelte";
  import InstalledModel from "./InstalledModel.svelte";

  let totlaSize = 0;

  try {
    ollama.list().then((list) => {
      models.update((models) => {
        return models.map((model) => {
          if (list.models.some((m) => m.model === model.image)) {
            return { ...model, installed: true };
          }
          return model;
        });
      });

      // calculate total size of installed models, 2 decimal places
      totlaSize = $models
        .filter((model) => model.installed)
        .reduce((acc, model) => {
          return acc + parseFloat(model.size);
        }, 0);

      // add new models that are not in models store but are in list (supposedly derived models)
      list.models.forEach((model) => {
        if (!$models.find((m) => m.image === model.model)) {
          models.update((models) => {
            return [
              ...models,
              {
                name: model.model,
                image: model.model,
                parameters: model.details.parameter_size,
                size: (model.size / 1024 / 1024 / 1024).toFixed(2),
                installed: true,
                derived: true,
              },
            ];
          });
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
</script>

<header class="flex items-center justify-between px-2">
  <h3 class="text-sm opacity-50 mb-1">Installed models</h3>
  <span class="text-xs">{totlaSize} GB</span>
</header>

<ul>
  {#each $models as model}
    {#if model.installed}
      <InstalledModel {model} />
    {/if}
  {/each}
</ul>

<header class="flex items-center justify-between px-2 mt-5">
  <h3 class="text-sm opacity-50 mb-1">Available models</h3>
</header>

<ul class="max-h-[200px] overflow-y-auto">
  {#each $models as model}
    {#if !model.installed}
      <AvailableModel {model} />
    {/if}
  {/each}
</ul>
