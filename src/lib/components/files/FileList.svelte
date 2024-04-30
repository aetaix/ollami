<script>
  import { files } from "$lib/stores/files";
  import { browser } from "$app/environment";
  import FileItem from "./FileItem.svelte";

  if ($files.length === 0 && browser && localStorage.getItem("files")) {
    files.set(JSON.parse(localStorage.getItem("files")));
  }
</script>

{#if $files.length === 0}
<div class="flex justify-center flex-col items-center h-96 border border-black-200 dark:border-black-600 shadow  dark:bg-black-900 rounded-xl">
  <p class="text-black-500 dark:text-black-200 mb-2">No files found</p>
  <a
    href="/"
  class="border flex gap-2 items-center border-black-200 z-10 hover:bg-black-50 transition-colors text-black bg-white shadow px-4 py-2 rounded-lg"
>
  Start a RAG chat</a
>
</div>
{:else}

<table class="w-full">
  <thead class="">
    <tr class="bg-black-100 dark:bg-black-700">
      <th class="text-start p-2 rounded-l-lg">File</th>
      <th class="text-start p-2">Collection</th>
      <th class="text-start p-2">Usage</th>
      <th class="text-start p-2 rounded-r-lg"></th>
    </tr>
  </thead>
  <tbody>
    {#each $files as file}
      <FileItem
        name={file.name}
        size={file.size}
        type={file.type}
        collection={file.collection}
        chatID={file.chat}
        id={file.id}
      />
    {/each}
  </tbody>
</table>
{/if}