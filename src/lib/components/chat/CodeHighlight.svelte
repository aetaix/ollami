<script>
  import { HighlightAuto } from "svelte-highlight";
  import "svelte-highlight/styles/onedark.css";
  import Clip from "../icons/Clip.svelte";
  import Check from "../icons/Check.svelte";

  export let raw = "";
  export let lang = "";
  export let text = "";
  let copied = false;
  function copytoclipboard() {
    const clip = text.replace(/<[^>]*>?/gm, "");
    navigator.clipboard.writeText(clip);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  }
</script>

<div class="bg-black-800 rounded-md font-mono">
  <header class="bg-black-700 p-2 rounded-t-md text-xs flex items-center justify-between text-black-300">
    <span>{lang}</span>
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
  </header>
  <HighlightAuto code={text} />
</div>
