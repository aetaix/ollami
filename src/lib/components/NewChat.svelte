<script>
  import { fullscreen, ollamaIsActivated } from "$lib/stores/states";
  import { currentModel } from "$lib/stores/models";
  import { history } from "$lib/stores/history";
  import { goto } from "$app/navigation";
  import Tooglefullsize from "./chat/Tooglefullsize.svelte";
  import Welcome from "./chat/Welcome.svelte";
  import Input from "./chat/Input.svelte";
  import { writable } from "svelte/store";

  const id = Math.random().toString(36).substring(2, 11);
  let input = writable("");

  async function createChat() {
    const messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant. You are going to help the user with its query. Answer in their language. Try to give short answers. If you don't know the answer, just say so.",
      },
      {
        role: "user",
        content: $input,
      },
    ];

    let newChat = {
      id,
      name: "",
      model: $currentModel,
      messages,
    };

    history.update((chats) => {
      chats.unshift(newChat);
      return chats;
    });

    goto(`/chat/${newChat.id}`);
  }
</script>

<div
  class="h-screen p-2 {$fullscreen
    ? 'w-full'
    : 'w-4/5 pl-2'} transition-all absolute right-0 top-0"
>
  <div
    class="h-full overflow-hidden relative p-4 rounded-2xl border bg-white text-black dark:text-white border-black-200 dark:bg-black-800 dark:border-black-600"
  >
    <Tooglefullsize />

    <div class="h-full overflow-y-auto pt-20 pb-32">
      <Welcome />

      {#if $ollamaIsActivated}
        <Input bind:value={$input} on:submit={createChat} {id} />
      {/if}
    </div>
  </div>
</div>
