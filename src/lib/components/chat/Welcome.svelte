<script>
  import { ollamaIsActivated } from "$lib/stores/states";
  import { currentModel } from "$lib/stores/models";
  import Chevron from "../icons/Chevron.svelte";
  import Logo from "$lib/components/sidebar/Logo.svelte";
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
    <div
      class="w-full border flex justify-between border-black-200 dark:border-black-700 items-center gap-2 bg-white dark:bg-black-700 rounded-xl transition-shadow hover:shadow px-4 pr-2 py-2"
    >
      <button
        class="text-sm flex items-center justify-between gap-1 p-1 w-full"
      >
        <div class="flex items-center gap-2">
          <img
            src="/icons/models/{$currentModel.icon || 'model.svg'}"
            alt=""
            class="w-5"
          />
          <span class="text-black-400 font-mono">{$currentModel.name} /</span>
          <span class="font-semibold">{$currentModel.image}</span>
        </div>
        <Chevron />
      </button>
    </div>
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
