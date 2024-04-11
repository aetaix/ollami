<script>
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { fullscreen } from "$lib/stores/states";
</script>

<svelte:head>
  <title>Ollami - Svelte</title>
</svelte:head>

<main class="flex">
  <Sidebar />

  <div
    class="h-screen p-2 {$fullscreen
      ? 'w-full'
      : 'w-4/5 pl-2'} transition-all absolute right-0 top-0"
  >
    <div
      class="h-full overflow-hidden relative p-4 rounded-2xl border bg-white text-black dark:text-white border-black-200 dark:bg-black-800 dark:border-black-600 flex gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold">Ollami</h1>
        <p class="text-sm">Welcome to Ollami, a simple chatbot that uses the GPT-3 model to generate responses to your prompts. You can
      </div>
  </div>
  </div>
</main>
