<script>
  import { browser } from "$app/environment";
  import { files } from "$lib/stores/files";
  export let id = "";
  let count = 0;

  $: {
    if (browser && $files) {
      // find the files in localstroage that have the chat id
      const files = JSON.parse(localStorage.getItem("files"));
      const chatFiles = files.filter((f) => f.chat === id);
      count = chatFiles.length;
    }
  }
</script>

<span class=" bg-purple/10 text-purple p-2 font-mono text-xs rounded-md"
  >RAG <span class="p-1 rounded bg-purple-600 text-white">{count}</span></span
>
