<script>
  import { models } from "$lib/stores/models";
  import ModelFile from "./ModelFile.svelte";
  import ModelItem from "./ModelItem.svelte";
  let search = "";

  let filters = {
    search: "",
    tags: "",
    installed: false,
    sort: "name",
  };

  let tags = $models?.reduce((acc, model) => {
    model.tags?.forEach((tag) => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);

  const sortMethods = [
    { name: "Name", value: "name" },
    { name: "Size", value: "size" },
    { name: "Popularity", value: "popularity" },
  ];

  const toggleFilterInstalled = () => {
    filters.installed = !filters.installed;
  };

  let filteredModels = [];
  $: filteredModels =
    $models
      ?.filter(
        (model) =>
          model.name.toLowerCase().includes(search.toLowerCase()) &&
          (filters.tags ? model.tags?.includes(filters.tags) : true) &&
          (filters.installed ? model.installed : true)
      )
      .sort((a, b) => {
        if (filters.sort === "name") {
          return a.name.localeCompare(b.name);
        } else if (filters.sort === "size") {
          return a.size - b.size;
        } else if (filters.sort === "popularity") {
          return b.popularity - a.popularity;
        }
      }) || [];
</script>

<div class="flex items-center justify-between">
  <div class="flex items-center gap-2">
    <input
      type="text"
      class=" p-2 border text-sm border-black-200 dark:border-black-600 bg-transparent rounded-md"
      placeholder="Search models"
      bind:value={search}
    />
    <select
      class="border text-sm border-black-200 dark:border-black-600 rounded-md p-2 bg-transparent"
      bind:value={filters.tags}
    >
      <option value="">All tags</option>
      {#each tags as tag}
        <option value={tag}>{tag}</option>
      {/each}
    </select>
    <select
      class="border text-sm border-black-200 w-full dark:border-black-600 rounded-md p-2 bg-transparent"
      bind:value={filters.sort}
    >
      {#each sortMethods as method}
        <option value={method.value}>{method.name}</option>
      {/each}
    </select>
    <button
      on:click={toggleFilterInstalled}
      class="border text-sm border-black-200 dark:border-black-600 rounded-md p-2 flex items-center gap-2"
    >
      <div
        class="
          {filters.installed
          ? 'bg-green-500 border-green'
          : 'border-black-200 dark:border-black-600 bg-black-200'}
          rounded-full border p-0.5 w-10"
      >
        <div
          class="
              {filters.installed ? 'translate-x-full ' : 'translate-x-0'}
              w-4 h-4 rounded-full bg-white transition-transform"
        ></div>
      </div>
      <span>Installed</span>
    </button>
  </div>
  <div class="flex items-center justify-end">
    <ModelFile />
  </div>
</div>

{#if filteredModels.length > 0}
  <div class="grid grid-cols-2 gap-4">
    {#each filteredModels as model}
      <ModelItem
        name={model.name}
        image={model.image}
        icon={model.icon || "model.svg"}
        parameters={model.parameters}
        description={model.description ||
          "This model is derived, meaning it use its parent model's weights to generate responses."}
        tags={model.tags || []}
        size={model.size}
        popularity={model.popularity}
        installed={model.installed}
      />
    {/each}
  </div>
{:else}
  <div
    class="bg-black-50 flex justify-center items-center h-[calc(100%-140px)] w-full rounded-lg border border-black-200"
  >
    <p class="text-center text-black-500 dark:text-black-300">
      No models found
    </p>
  </div>
{/if}
