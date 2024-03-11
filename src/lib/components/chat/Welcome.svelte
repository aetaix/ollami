<script>
  import { ollamaIsActivated } from "$lib/stores/states";
  import Logo from "$lib/components/sidebar/Logo.svelte";
  import DropdownModels from "../models/DropdownModels.svelte";

</script>

{#if $ollamaIsActivated}
  <div
    id="welcome"
    class="w-full max-w-lg mx-auto flex flex-col items-center text-center h-full justify-center"
  >
    <Logo class="w-24" />
    <h1 class="text-3xl mb-5">
      The hub for open source LLMs.<br />Powered by Ollama
    </h1>
    <p class="opacity-50 mb-5">Chat with hundred of LLM available</p>
    <DropdownModels />
  </div>
{:else}
  <div
    class="w-full max-w-xl mx-auto flex flex-col items-center text-center h-full justify-center"
  >
    <Logo class="w-8" />

    <h1 class="text-2xl mb-2">Ollama is disconnected</h1>
    <p>
      Please install <a
        href="https://ollama.com/"
        target="_parent"
        class="underline">Ollama</a
      > or launch the application
    </p>
  </div>
{/if}

<style>
  #welcome {
    animation: appear 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation-fill-mode: backwards;
  }

  @keyframes appear {
    0% {
      transform: translateY(1rem);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
