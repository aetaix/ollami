<script>
  import { page } from "$app/stores";
  import Logo from "$lib/components/sidebar/Logo.svelte";
  import History from "./sidebar/History.svelte";
  import Dark from "./sidebar/Dark.svelte";
  import OllamaStatus from "./sidebar/OllamaStatus.svelte";
  import Prompt from "./icons/Prompt.svelte";
  import Model from "./icons/Model.svelte";
</script>

<div class="h-screen p-4 w-1/5 relative">
  <header class="flex justify-between items-center mb-5">
    <a href="/" class="inline-flex items-center space-x-2">
      <Logo class="w-8" />
      <span class=" font-semibold">myllama</span>
    </a>
    <OllamaStatus />
  </header>
  <History />
  <div class="space-y-2">
    <a
      href="/prompts"
      class="
      {$page.url.pathname.includes('prompts') ? 'bg-black-700' : 'hover:bg-black-800'}
      flex px-4 items-center gap-2 py-3 rounded-lg transition-colors text-sm"
    >
      <Prompt />
      Prompts Librairy</a
    >
    <a
      href="/models"
      class="
      {$page.url.pathname.includes('models') ? 'bg-black-700' : 'hover:bg-black-800'}
      flex items-center gap-2 px-4 py-3 rounded-lg transition-colors text-sm"
    >
      <Model class="w-5" />

      Models</a
    >
  </div>
  <div class="absolute bottom-4 left-4 right-1">
    <Dark />
  </div>
</div>
