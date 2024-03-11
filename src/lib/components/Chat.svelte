<script>
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import { history } from "$lib/stores/history";
  import { useChat } from "ai/svelte";
  import { currentModel } from "$lib/stores/models";
  import { fullscreen, ollamaIsActivated } from "$lib/stores/states";
  import AssistantMessage from "./chat/AssistantMessage.svelte";
  import UserMessage from "./chat/UserMessage.svelte";
  import Tooglefullsize from "./chat/Tooglefullsize.svelte";
  import Input from "./chat/Input.svelte";

  let chatModel = "";

  const { input, messages, setMessages, append } = useChat({
    onFinish: updateChat,
  });

  $: {
    if (browser) {
      const currentChat = $history.find((conv) => conv.id === $page.params.id);
      if (currentChat) {
        setMessages(currentChat.messages);
        chatModel = currentChat.model;
      }
    }
  }

  function handleSubmit() {
    if ($input) {
      append(
        { role: "user", content: $input },
        {
          options: { body: { currentModel: chatModel } },
        }
      );
      $input = "";
    }
  }

  function updateChat() {
    let chat = $messages.map((message) => {
      return {
        role: message.role,
        content: message.content,
      };
    });

    history.update((chats) => {
      const index = chats.findIndex((conv) => conv.id === $page.params.id);
      chats[index].messages = chat;
      return chats;
    });
  }

  let chatContainer;
  $: if ($messages.length > 1) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
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
    <span class="absolute top-4 left-4 bg-black-100 px-3 font-mono text-xs  py-2 rounded-md">{chatModel.image}</span>
    <Tooglefullsize />

    <div bind:this={chatContainer} class="h-full overflow-y-auto pt-20 pb-32">
      <div class="w-full max-w-2xl mx-auto">
        {#each $messages as message}
          {#if message.role === "assistant"}
            <AssistantMessage
              content={message.content}
              model={chatModel}
            />
          {/if}
          {#if message.role === "user"}
            <UserMessage content={message.content} />
          {/if}
        {/each}
      </div>
      {#if $ollamaIsActivated && $currentModel}
        <Input bind:value={$input} onSubmit={handleSubmit} />
      {/if}
    </div>
  </div>
</div>
