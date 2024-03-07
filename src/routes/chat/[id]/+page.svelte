<script>
  import { page } from "$app/stores";
  import Chat from "$lib/components/Chat.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
</script>

<svelte:head>
  <title>ollamaGPT - Svelte</title>
</svelte:head>

<main class="flex">
  <Sidebar />
  <Chat />
</main>
