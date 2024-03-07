<script>
  import { currentModel } from "$lib/stores/models";
  import { ollamaIsActivated } from "$lib/stores/states";
  import ollama from "ollama";

  async function detectOllama() {
    try {
      const check = await ollama.show({
        model: $currentModel.image,
      });

      if (check) {
        ollamaIsActivated.set(true)
       
      }
    } catch (e) {
      console.log(e);
    }
  }
  detectOllama();
</script>

{#if $ollamaIsActivated}
  <div class="rounded-full bg-black-800 px-3 py-2 flex items-center gap-2 text-green">
    <span class="w-2 h-2 bg-green rounded-full"></span>
    <span class="text-[10px] font-semibold uppercase">Connected</span>
  </div>
{:else}
  <div class="rounded-full bg-black-800 px-3 py-2 flex items-center gap-2 text-red">
    <span class="w-2 h-2 bg-red rounded-full"></span>
    <span class="text-[10px] font-semibold uppercase">Not connected</span>
  </div>
{/if}
