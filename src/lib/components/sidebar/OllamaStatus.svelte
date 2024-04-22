<script>
  import { ollamaIsActivated } from "$lib/stores/states";
  import { onMount } from "svelte";

  async function detectOllama() {
    try {
      // try fetching the ollama local endpoint
      const response = await fetch("http://127.0.0.1:11434");

      // if the response is ok, then ollama is activated
      if (response.ok) {
        ollamaIsActivated.set(true);
      } else {
        ollamaIsActivated.set(false);
      }
    } catch (e) {
      console.log(e);
    }
  }
  onMount(detectOllama);
</script>

{#if $ollamaIsActivated}
  <div
    class="rounded-full bg-green-50 dark:bg-black-800 px-3 py-2 flex items-center gap-2 text-green"
  >
    <span class="w-2 h-2 bg-green rounded-full"></span>
    <span class="text-[10px] font-semibold uppercase">Ready</span>
  </div>
{:else}
  <div
    class="rounded-full bg-black-800 px-3 py-2 flex items-center gap-2 text-red"
  >
    <span class="w-2 h-2 bg-red rounded-full"></span>
    <span class="text-[10px] font-semibold uppercase">Not connected</span>
  </div>
{/if}
