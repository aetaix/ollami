<script>
  import Chat from "$lib/components/Chat.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
</script>

<svelte:head>
  <title>Chat | Ollami</title>
</svelte:head>

<main class="flex">
  <Sidebar />
  <Chat />
</main>
