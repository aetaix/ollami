<script>
  import { currentModel, models } from "$lib/stores/models";

  let countInstalledModels = 0;
  let diskSpace = 0;

  $: countInstalledModels = $models.filter((model) => model.installed).length;

  $: diskSpace = $models.reduce((acc, model) => {
    if (model.installed) {
      return acc + model.size;
    }
    return acc;
  }, 0);
</script>

<div class="grid grid-flow-col gap-5">
  <div class="rounded-xl border border-black-200 p-4 bg-white shadow">
    {#if $currentModel}
      <div class="flex gap-2 items-center mb-4">
        <span class="w-3 h-3 rounded-full bg-green"></span>
        Currently running
      </div>
      <div class="grid grid-cols-2 gap-5 divide-x divide-black-200">
        <div>
          <span class="text-sm text-black-400">{$currentModel.name}</span>
          <h4 class="text-lg">{$currentModel.image}</h4>
        </div>
        <div class="pl-5">
          <span class="text-sm text-black-400">Context</span>
          <h4 class="text-lg">4,096 tokens</h4>
        </div>
      </div>
    {:else}
      <div class="flex gap-2 items-center mb-4 h-full justify-center">
        <span class="w-3 h-3 rounded-full bg-red"></span>
        No model running yet
      </div>
    {/if}
  </div>
  <div class="rounded-xl border border-black-200 p-4 bg-white shadow">
    <h3 class="mb-4">Installed model</h3>
    <div class="grid grid-cols-2 gap-5 divide-x divide-black-200">
      <div class="">
        <span class="text-sm text-black-400">Models</span>
        <h4 class="text-lg">{countInstalledModels}</h4>
      </div>
      <div class="pl-5">
        <span class="text-sm text-black-400">Disk usage</span>
        <h4 class="text-lg">{diskSpace}GB</h4>
      </div>
    </div>
  </div>
</div>
