<script>
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Model from "$lib/components/icons/Model.svelte";
  import ModelList from "$lib/components/models/ModelList.svelte";
  import ModelStats from "$lib/components/models/ModelStats.svelte";
</script>

<main class="flex">
    <Sidebar />
    <div
      class="h-screen p-2
        w-4/5 pl-2 transition-all absolute right-0 top-0"
    >
      <div
        class="h-full overflow-y-auto relative p-6 pt-4 rounded-2xl border bg-white text-black dark:text-white border-black-200 dark:bg-black-800 dark:border-black-600 space-y-5"
      >
      <header class="flex justify-between items-center">
        <h1 class="items-center flex gap-3 text-xl font-semibold">
          <Model class="w-5" /> Manage local models
        </h1>
        <ModelStats />
      </header>

      <ModelList />
       
      </div>
    </div>
  </main>