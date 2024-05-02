<script>
  import { companions } from "$lib/stores/companions";
  import CompanionItem from "./CompanionItem.svelte";
</script>

{#if $companions.length === 0}
  <div class="w-full pt-20">
    <div class="bg-white dark:bg-black-700 max-w-lg mx-auto shadow-lg rounded-xl border border-black-200 dark:border-black-600">
      <header class="h-[240px]">
        <img src="/img/companions.webp" class="w-full h-full object-cover rounded-t-xl" alt="">
      </header>
      <div class="p-4">
        <h2 class="font-semibold text-lg">Discover Companions!</h2>
        <p>Companions are here to help you in any task, just give them the correct instructions and they will then be avaialbe in the chats options.</p>
      </div>
      <footer class="border-t border-black-200 dark:border-black-600 p-4 flex items-center justify-end">
        <button class="bg-black hover:bg-black-800 rounded-lg px-3 py-2 text-white">
          Create your first companion
        </button>
      </footer>
    </div>
  </div>
{:else}
<ul class="grid grid-cols-4 gap-4">
  {#each $companions as companion}
    <CompanionItem
      name={companion.name.split(":")[0]}
      model={companion.model}
      description={companion.description}
      image={companion.model}
      parameters={companion.details.parameter_size}
    />
  {/each}
</ul>
{/if}