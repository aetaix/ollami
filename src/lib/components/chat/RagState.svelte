<script>
  import { browser } from "$app/environment";
  import { collections } from "$lib/stores/collections";
  export let name= "";
  let count = 0;

  $: {
    if (browser && $collections) {
      // find the files in localstroage that have the chat id
      const collections = JSON.parse(localStorage.getItem("collections"));
      const collection = collections.find((col) => col.name === name);
      count = collection.files.length;
    }
  }
</script>

<span class=" bg-purple/10 text-purple p-2 font-mono text-xs rounded-md"
  >RAG <span class="p-1 rounded bg-purple-600 text-white">{count}</span></span
>
