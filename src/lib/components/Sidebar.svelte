<script>
  import Logo from "$lib/components/sidebar/Logo.svelte";
  import History from "./sidebar/History.svelte";
  import Dark from "./sidebar/Dark.svelte";
  import OllamaStatus from "./sidebar/OllamaStatus.svelte";
  import Prompt from "./icons/Prompt.svelte";
  import Model from "./icons/Model.svelte";
  import File from "$lib/components/icons/File.svelte";
  import Bot from "./icons/Bot.svelte";
  import SidebarItem from "./SidebarItem.svelte";
</script>

<div class="h-screen p-4 pr-2 w-1/5 relative">
  <header class="flex justify-between items-center mb-5 relative">
    <a href="/" class="inline-flex items-center space-x-2">
      <Logo class="w-5" />
      <span class=" font-semibold">Ollami</span>
    </a>
    <OllamaStatus />
  </header>
  <History />
  <div class="space-y-2">

    <SidebarItem url="companions">
     <Bot class="w-6" />
      Companions
    </SidebarItem>

    <SidebarItem url="prompts">
      <Prompt class="w-5" />
      Prompts Librairy
    </SidebarItem>

    <SidebarItem url="models">
      <Model class="w-5" />
      Models
    </SidebarItem>

    <SidebarItem url="data">
      <File class="w-4" />
      Files
    </SidebarItem>
  </div>
  <div class="absolute bottom-4 left-4 right-1">
    <Dark />
  </div>
</div>
