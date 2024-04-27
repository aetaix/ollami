<script>
  import { browser } from "$app/environment";
  import { prompts, modal } from "$lib/stores/prompts";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let value = "";
  let selectedIndex = 0;

  if (browser) {
    if (localStorage.getItem("prompts")) {
      prompts.set(JSON.parse(localStorage.getItem("prompts")));
    } else {
      localStorage.setItem("prompts", JSON.stringify([]));
      prompts.set([]);
    }
  }

  let filteredPrompts = [];

  $: {
    filteredPrompts = $prompts.filter((prompt) => {
      return prompt.command.includes(value.slice(1));
    });
    // Reset selectedIndex when filteredPrompts changes
    selectedIndex = 0;
  }

  export function setPrompt() {
    let prompt = filteredPrompts[selectedIndex].content;
    dispatch("prompt", { prompt });
  }

  function clickToSetPrompt(index) {
    let prompt = filteredPrompts[index].content;
    dispatch("prompt", { prompt });
  }

  export function navigate(event) {
    if (event.direction === "ArrowDown") {
      if (selectedIndex < filteredPrompts.length - 1) {
        selectedIndex++;
      }
    } else if (event.direction === "ArrowUp") {
      if (selectedIndex > 0) {
        selectedIndex--;
      }
    }
  }
</script>

{#if $modal}
  {#if filteredPrompts.length > 0}
    <div
      class="modal w-full mb-4 max-w-[700px] mx-auto bg-white bottom border border-black-200 rounded-xl p-2 shadow"
    >
      {#each filteredPrompts as prompt, index}
        <button
          on:click={() => clickToSetPrompt(index)}
          class="{index === selectedIndex ? 'bg-black-100' : ''}
      p-2 text-start hover:bg-black-50 w-full rounded-lg"
        >
          <h3 class="text-sm font-semibold font-mono">/{prompt.command}</h3>
          <span class="text-xs text-black-400 block">{prompt.name}</span>
        </button>
      {/each}
    </div>
  {:else}
    <div
      class="modal w-full mb-4 max-w-[700px] mx-auto text-start bg-white bottom border border-black-200 rounded-xl p-4 shadow"
    >
    <a href="/prompts" class="text-center text-black-400">
        No prompts found:<span class="text-black underline ml-1"> Add a prompt</span> 
      </a>
    </div>
  {/if}
{/if}

<style>
  .modal {
    animation: entrance 0.3s ease;
  }

  @keyframes entrance {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
  }
</style>
