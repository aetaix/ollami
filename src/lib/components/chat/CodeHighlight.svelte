<script>
  import { HighlightAuto } from "svelte-highlight";
  import "svelte-highlight/styles/onedark.css";


  export let raw = "";
  export let lang = "";
  export let text = "";

  function copytoclipboard() {
    const text = raw.innerHTML.replace(/<[^>]*>?/gm, "");
    navigator.clipboard.writeText(text);
  }

</script>


<div class="bg-black-800 rounded-md font-mono">
  <header class="bg-black-700 p-2 rounded-t-md text-xs text-black-300">
    <span>{lang}</span>
    <button></button>
  </header>
  <HighlightAuto code={text} />
</div>
