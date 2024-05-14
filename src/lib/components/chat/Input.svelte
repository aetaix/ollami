<script>
  import Arrow from "../icons/Arrow.svelte";
  import { modal } from "$lib/stores/prompts";
  import PromptModal from "./PromptModal.svelte";
  import { createEventDispatcher } from "svelte";
  import Upload from "./Upload.svelte";

  const dispatch = createEventDispatcher();
  export let value = "";
  export let writing = false;


  let textarea = null;
  let promptModal;

  $: {
    if (value.includes("/") && value.indexOf("/") === 0) {
      modal.set(true);
    } else {
      modal.set(false);
    }
  }

  function handleKeydown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if ($modal) {
        promptModal.setPrompt();
      } else if (value.length > 0) {
        submit();
      }
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      promptModal.navigate({ direction: e.key });
    } else if (e.key === "Escape") {
      e.preventDefault();
      modal.set(false);
      textarea.value = "";
    }
  }

  function setPrompt(e) {
    const prompt = e.detail.prompt;

    value = prompt;

    if (prompt.includes("[")) {
      const start = prompt.indexOf("[");
      const end = prompt.indexOf("]");
      textarea.focus();
      setTimeout(() => {
        textarea.setSelectionRange(start, end + 1);
      }, 0);
    }

    if (prompt.includes("{{CLIPBOARD}}")) {
      navigator.clipboard.readText().then((text) => {
        value = prompt.replace("{{CLIPBOARD}}", text);
      });
    }

    modal.set(false);
  }

  function submit() {
    dispatch("submit");
  }

  function stop() {
    writing = false;
    dispatch("stop");
  }
</script>

<div
  class="absolute bottom-2 left-2 right-2 pb-8 z-10 bg-gradient-to-r from-white dark:from-black-800 from-80% to-90%"
>
  <PromptModal bind:this={promptModal} bind:value on:prompt={setPrompt} />
  <form
    on:submit|preventDefault={submit}
    class="w-full max-w-[700px] mx-auto gap-2 flex items-center border shadow-lg bg-white dark:bg-black-700 border-black-200 dark:border-black-600 rounded-xl pl-4 relative"
  >
    <Upload />

    <textarea
      type="text"
      class="w-full bg-transparent focus:outline-none h-[56px] pr-8 py-4 resize-none"
      on:keydown={handleKeydown}
      bind:value
      bind:this={textarea}
      row="1"
      placeholder="Ask me anything..."
    ></textarea>
    {#if writing}
      <button
        on:click={stop}
        class="w-10 h-10 rounded-lg flex items-center justify-center absolute right-2 bottom-2"
      >
        <div
          class="w-7 h-7 rounded-full border-2 border-black-700 dark:border-white flex justify-center items-center"
        >
          <div class="w-3 h-3 bg-black-700 dark:bg-white"></div>
        </div>
      </button>
    {:else}
      <button
        type="submit"
        class="
        {value.length > 0
          ? 'dark:bg-white dark:text-black bg-black-700 text-white'
          : ' dark:bg-black-800 dark:text-black-600 bg-black-100 text-black-300 pointer-events-none'}
        w-10 h-10 rounded-lg flex items-center justify-center absolute right-2 bottom-2"
      >
        <Arrow />
      </button>
    {/if}
  </form>
</div>
