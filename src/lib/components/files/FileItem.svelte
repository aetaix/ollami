<script>
  import { files } from "$lib/stores/files";
  import { history } from "$lib/stores/history";
  export let name = "";
  export let size = 0;
  export let type = "";
  export let collection = "";
  export let chatID = "";
  export let id = "";

  // function to round file size to ko, mo or go
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  async function deleteCollection(id, name) {
    fetch("api/chroma/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name }),
    });

    files.update((f) => f.filter((file) => file.id !== id));
    localStorage.setItem("files", JSON.stringify($files));

    /*
    // recursive change the chat history to put the rag key false
    history.update((h) => {
      return h.map((chat) => {
        if (chat.id === chatID) {
          delete chat.rag;
          return chat;
        } else {
          return chat;
        }
      });
    });
    */
  }
</script>

<tr class="border-b border-black-100 hover:bg-black-50">
  <td class="py-4 px-2">
    <div>
      <h3 class="font-semibold">{name}</h3>
      <span class="text-sm text-black-500"
        >{formatBytes(size)} - {type.split("/")[1]}</span
      >
    </div>
  </td>
  <td class="p-2">
    <span class="bg-purple-100 text-purple rounded p-1">{collection}</span>
  </td>
  <td class="p-2">
    <a href="/chat/{chatID}" class="underline">/chat/{chatID}</a>
  </td>
  <td class="p-2">
    <button
      class="border border-black-200 shadow rounded-lg p-2"
      on:click={() => deleteCollection(id, collection)}
    >
      Delete
    </button>
  </td>
</tr>
