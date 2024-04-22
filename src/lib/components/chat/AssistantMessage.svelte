<script>
  import SvelteMarkdown from "svelte-markdown";
  import { createEventDispatcher } from "svelte";
  import CodeHighlight from "./CodeHighlight.svelte";
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
        <img
          src="/icons/models/{model.icon || 'model.svg'}"
          class="w-6"
          alt=""
        />
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
      <SvelteMarkdown source={content} 
      renderers={{ code: CodeHighlight }}
      />
    </div>
    <div class="flex pl-11 pt-6 pb-2 items-center gap-2">
      <button
        on:click={copytoclipboard}
        class="opacity-50 hover:opacity-100 text-sm cursor-pointer text-purple-600 hover:underline"
      >
        {#if !copied}
          <svg
            width="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_21_3667)">
              <path
                d="M7 4V2H17V4H20.007C20.555 4 21 4.445 21 4.993V21.007C20.9997 21.2703 20.895 21.5227 20.7089 21.7089C20.5227 21.895 20.2703 21.9997 20.007 22H3.993C3.72972 21.9997 3.4773 21.895 3.29114 21.7089C3.10497 21.5227 3.00026 21.2703 3 21.007V4.993C3 4.445 3.445 4 3.993 4H7ZM7 6H5V20H19V6H17V8H7V6ZM9 4V6H15V4H9Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_21_3667">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        {:else}
          <svg
            width="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_21_8172)">
              <path
                d="M9.99999 15.172L19.192 5.979L20.607 7.393L9.99999 18L3.63599 11.636L5.04999 10.222L9.99999 15.172Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_21_8172">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
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
