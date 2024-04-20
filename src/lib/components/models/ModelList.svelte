<script>
  import { models } from "$lib/stores/models";
  import ModelFile from "./ModelFile.svelte";
  import ModelItem from "./ModelItem.svelte";
  let search = "";

  let filters = {
    search: "",
    tags: "",
    installed: true,
  };
  let tags = $models?.reduce((acc, model) => {
    model.tags?.forEach((tag) => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);

  const toggleFilterInstalled = () => {
    filters.installed = !filters.installed;
  };

  let filteredModels = [];
  $: filteredModels =
    $models?.filter(
      (model) =>
        model.name.toLowerCase().includes(search.toLowerCase()) &&
        (filters.tags ? model.tags?.includes(filters.tags) : true) &&
        (filters.installed ? model.installed : true)
    ) || [];
</script>

<div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
        <input
          type="text"
          class=" p-2 border text-sm border-black-200 rounded-md"
          placeholder="Search models"
          bind:value={search}
        />
        <select
          class="border text-sm border-black-200 rounded-md p-2"
          bind:value={filters.tags}
        >
          <option value="">All tags</option>
          {#each tags as tag}
            <option value={tag}>{tag}</option>
          {/each}
        </select>
        <button 
        on:click={toggleFilterInstalled}
        class="border text-sm border-black-200 rounded-md p-2 flex items-center gap-2">
          <div class="
          {filters.installed ? 'bg-green-500 border-green' : 'border-black-200 bg-black-200'}
          rounded-full border  p-0.5 w-10">
              <div class="
              {filters.installed ? 'translate-x-full ' : 'translate-x-0'}
              w-4 h-4 rounded-full bg-white transition-transform">
              </div>
          </div>
          <span>Installed</span>
        </button>
      </div>
      <div class="flex items-center justify-end">
        <ModelFile />
      </div>
</div>


<div class="grid grid-cols-2 gap-4">
  {#if filteredModels.length > 0}
    {#each filteredModels as model}
      <ModelItem
        name={model.name}
        image={model.image}
        icon={model.icon || "model.svg"}
        parameters={model.parameters}
        description={model.description || "This model is derived, meaning it use its parent model's weights to generate responses."}
        tags={model.tags || []}
        size={model.size}
        installed={model.installed}
      />
    {/each}
  {:else}
    <p class="text-center text-black-500 dark:text-black-300">
      No models found
    </p>
  {/if}
</div>
