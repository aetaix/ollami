<script>
  import { browser } from "$app/environment";
  import { prompts } from "$lib/stores/prompts";

  if (browser) {
    if (localStorage.getItem("prompts")) {
      prompts.set(JSON.parse(localStorage.getItem("prompts")));
    } else {
      localStorage.setItem("prompts", JSON.stringify([]));
      prompts.set([]);
    }
  }

  export let input = "";
  let filteredPrompts = [];

  // if statement to check if input includes a slash and that slash is the first character
  $: if (input.includes("/") && input.indexOf("/") === 0) {
    promptModal = true;

    // filter prompts based on input
    filteredPrompts = $prompts.filter((prompt) => {
      return prompt.command.includes(input.slice(1));
    });

    const chatInput = document.getElementById("chat-input");

    // add event listener to handle keydown events
    chatInput.addEventListener("keydown", handleKeydown);
  } else {
    promptModal = false;
  }

  // function to handle keydown events
  function handleKeydown(e) {
    if (e.key === "ArrowDown") {
      selectedIndex =
        selectedIndex === filteredPrompts.length - 1 ? 0 : selectedIndex + 1;
    } else if (e.key === "ArrowUp") {
      selectedIndex =
        selectedIndex === 0 ? filteredPrompts.length - 1 : selectedIndex - 1;
    } else if (e.key === "Enter") {
        
      e.preventDefault();
      const chatInput = document.getElementById("chat-input");
      chatInput.value = filteredPrompts[selectedIndex].content;

      // if prompt content contain [ and ] then focus and select this part [...]
      if (filteredPrompts[selectedIndex].content.includes("[")) {
        const start = filteredPrompts[selectedIndex].content.indexOf("[");
        const end = filteredPrompts[selectedIndex].content.indexOf("]");
        chatInput.focus();
        chatInput.setSelectionRange(start, end + 1);
      }

      if (filteredPrompts[selectedIndex].content.includes("{{CLIPBOARD}}")) {
        navigator.clipboard.readText().then((text) => {
          chatInput.value = filteredPrompts[selectedIndex].content.replace(
            "{{CLIPBOARD}}",
            text
          );
        });
      }

      promptModal = false;
    }
  }

  let promptModal = false;
  let selectedIndex = 0;
</script>

{#if promptModal && filteredPrompts.length > 0}
  <div
    class="modal w-full mb-4 max-w-2xl mx-auto bg-white bottom border border-black-200 rounded-xl p-2 shadow"
  >
    {#each filteredPrompts as prompt, index}
      <button
        class="
      {index === selectedIndex ? 'bg-black-50' : ''}
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
