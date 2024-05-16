<script>
  import Sidebar from "$lib/components/Sidebar.svelte";
  import CompanionsList from "$lib/components/companions/CompanionsList.svelte";
  import CreateCompanion from "$lib/components/companions/CreateCompanion.svelte";
  import Bot from "$lib/components/icons/Bot.svelte";
</script>

<main class="flex">
  <Sidebar />
  <div
    class="h-screen p-2
            w-4/5 pl-2 transition-all absolute right-0 top-0"
  >
    <div
      class="h-full flex flex-col overflow-y-auto relative p-6 rounded-2xl border bg-white text-black dark:text-white border-black-200 dark:bg-black-800 dark:border-black-600 space-y-5"
    >
      <header class="flex justify-between items-center shrink-0 h-14">
        <div class="flex gap-2 items-center">
            <Bot class="w-6" />
            <h1 class="items-center flex gap-3 text-xl font-semibold">
              Companions
            </h1>
        </div>

      </header>
      <CompanionsList />
    </div>
  </div>
</main>
