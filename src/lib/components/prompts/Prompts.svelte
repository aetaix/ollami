<script>
  import { browser } from "$app/environment";
  import { prompts, currentPrompt, create } from "$lib/stores/prompts";

  if (browser) {
    if (localStorage.getItem("prompts")) {
      prompts.set(JSON.parse(localStorage.getItem("prompts")));
    } else {
      localStorage.setItem("prompts", JSON.stringify([]));
      prompts.set([]);
    }
  }

  let search = "";
  let filteredPrompts = [];

  $: filteredPrompts = $prompts.filter((prompt) => {
    return prompt.name.toLowerCase().includes(search.toLowerCase());
  });

  function setPrompt(i) {
    currentPrompt.set(i);
    create.set(false);
  }
</script>

{#if $prompts.length > 0}
  <header class="border-b dark:border-black-600 border-black-200 p-2">
    <input
      bind:value={search}
      type="text"
      class="w-full bg-transparent p-1"
      placeholder="Search"
    />
  </header>
  <div class="p-2">
    {#each filteredPrompts as prompt, index}
      {#if prompt.name.length > 0}
        <button
          on:click={() => {
            setPrompt(index);
          }}
          class="{$currentPrompt === index ? 'bg-black-100 dark:bg-black-600' : 'hover:bg-black-100 dark:hover:bg-black-600'} 
        p-2 block mb-2 w-full rounded-lg cursor-pointer text-start transition-colors"
        >
          <h2 class="font-bold text-sm">
            {prompt.name}
          </h2>
          <span
            class="font-mono bg-black-50 dark:bg-black-900 rounded p-1 text-sm text-black-500 dark:text-black-200"
          >
            /{prompt.command}
          </span>
        </button>
      {/if}
    {/each}
  </div>
{:else}
<div class="h-full flex flex-col justify-center">
  <p class="text-center text-sm opacity-50">No prompts found</p>
</div>
 
{/if}
