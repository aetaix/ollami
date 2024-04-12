<script>
  import Arrow from "../icons/Arrow.svelte";
  import PromptModal from "./PromptModal.svelte";

  export let value = "";
  export let onSubmit;
  let textarea;
  // when value changes, count number of lines and resize textarea accordingly

  $: if (value) {
    const lines = value.split("\n").length;
    textarea.style.height = `${lines * 56}px`;
  }

  function handleSubmit() {
    if (value.includes("/") && value.indexOf("/") === 0) {
      return;
    }
    onSubmit();
  }
</script>

<div
  class="absolute bottom-2 left-2 right-2 pb-10 z-10 bg-gradient-to-r from-white dark:from-black-800 from-80% to-90%"
>
  <PromptModal input={value} />
  <form
    on:submit|preventDefault={handleSubmit}
    class="w-full max-w-2xl mx-auto flex border shadow-lg bg-white dark:bg-black-700 border-black-200 dark:border-black-600 rounded-xl pl-4 relative"
  >
    <textarea
      type="text"
      id="chat-input"
      class="w-full bg-transparent focus:outline-none h-[56px] overflow-y-auto max-h-52 pr-8 py-4 resize-none"
      on:keydown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSubmit();
        }
      }}
      bind:value
      bind:this={textarea}
      row="1"
      placeholder="Ask me anything..."
    ></textarea>
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
  </form>
</div>
