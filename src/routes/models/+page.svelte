<script>
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Model from "$lib/components/icons/Model.svelte";
  import Stats from "$lib/components/models/Stats.svelte";
  import Models from "$lib/components/models/Models.svelte";
  import ModelFile from "$lib/components/models/ModelFile.svelte";
</script>

<svelte:head>
  <title>Models | Ollami</title>
</svelte:head>

<main class="flex">
  <Sidebar />
  <div
    class="h-screen p-2
      w-4/5 pl-2 transition-all absolute right-0 top-0"
  >
    <div
      class="h-full overflow-y-auto relative p-8 rounded-2xl border bg-white text-black dark:text-white border-black-200 dark:bg-black-800 dark:border-black-600 space-y-5"
    >
      <header class="flex justify-between items-center">
        <h1 class="items-center flex gap-3 text-xl font-semibold">
          <Model class="w-6" /> Models
        </h1>
        <ModelFile />
      </header>
      <Stats />
      <Models />
    </div>
  </div>
</main>
