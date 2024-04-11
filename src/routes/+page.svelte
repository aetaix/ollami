<script>
  import NewChat from "$lib/components/NewChat.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
</script>

<svelte:head>
  <title>Local LLM | Ollami</title>
</svelte:head>

<main class="flex">
  <Sidebar />
  <NewChat />
</main>
