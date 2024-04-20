<script>
  import { browser } from "$app/environment";
  import { prompts, modal } from "$lib/stores/prompts";

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

    if (prompt.includes("{{CLIPBOARD}}")) {
      navigator.clipboard.readText().then((text) => {
        value = prompt.replace("{{CLIPBOARD}}", text);
      });
    } else {
      value = prompt;
    }
    modal.set(false);
  }

  function clickToSetPrompt(prompt) {
    setPrompt(prompt);
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
  <div
    class="modal w-full mb-4 max-w-2xl mx-auto bg-white bottom border border-black-200 rounded-xl p-2 shadow"
  >
    {#each filteredPrompts as prompt, index}
      <button
        on:click={() => clickToSetPrompt(prompt)}
        class="{index === selectedIndex ? 'bg-black-100' : ''}
      p-2 text-start hover:bg-black-50 w-full rounded-lg"
      >
        <h3 class="mb-0 block">/{prompt.command}</h3>
        <span class="text-xs text-black-400 block">{prompt.name}</span>
      </button>
    {/each}
  </div>
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
