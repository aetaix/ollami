<script>
  import SvelteMarkdown from "svelte-markdown";
  import { createEventDispatcher } from "svelte";
  import CodeHighlight from "./CodeHighlight.svelte";
  import Clip from "../icons/Clip.svelte";
  import Check from "../icons/Check.svelte";
  export let content = "";
  export let index;
  export let model = {};
  let message;
  let copied = false;

  function copytoclipboard() {
    const text = message.innerHTML.replace(/<[^>]*>?/gm, "");
    navigator.clipboard.writeText(text);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 3000);
  }

  const dispatch = createEventDispatcher();
  function regenerate() {
    dispatch("regenerate", { index });
  }
</script>

<div class="mb-4 p-4 rounded-xl bg-black-100 dark:bg-black-700">
  <div class="flex gap-2 items-center">
    <div class="w-8 h-8 shrink-0 flex items-center justify-center">
      <img src="/icons/models/{model.icon || 'model.svg'}" class="w-6" alt="" />
    </div>
    <div class=" flex items-center gap-1">
      <h3 class="font-semibold">
        {model.name}
      </h3>
    </div>
  </div>
  <div
    bind:this={message}
    class="mt-2 pl-10 prose dark:prose-invert dark:prose-p:text-white dark:prose-ul:text-white prose-pre:p-0 prose-pre:bg-transparent prose-pre:my-0 max-w-none"
  >
    <SvelteMarkdown source={content} renderers={{ code: CodeHighlight }} />
  </div>
  <div class="flex pl-11 pt-6 pb-2 items-center gap-2">
    <button
      on:click={copytoclipboard}
      class="opacity-50 hover:opacity-100 text-sm cursor-pointer text-purple-600 hover:underline"
    >
      {#if !copied}
        <Clip />
      {:else}
      <Check />
      {/if}
    </button>
    <button
      on:click={regenerate}
      class="opacity-50 hover:opacity-100 text-sm text-purple-600 hover:underline"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 15L10 19L14 23" stroke="currentColor" />
        <path
          d="M5.93782 15.5C5.14475 14.1264 4.84171 12.5241 5.07833 10.9557C5.31495 9.38734 6.07722 7.94581 7.24024 6.86729C8.40327 5.78877 9.8981 5.13721 11.4798 5.01935C13.0616 4.90149 14.6365 5.32432 15.9465 6.21856C17.2565 7.1128 18.224 8.42544 18.6905 9.94144C19.1569 11.4574 19.0947 13.0869 18.5139 14.5629C17.9332 16.0389 16.8684 17.2739 15.494 18.0656C14.1196 18.8573 12.517 19.1588 10.9489 18.9206"
          stroke="currentColor"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>
</div>
