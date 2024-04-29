<script>
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import { useChat } from "ai/svelte";
  import { history } from "$lib/stores/history";
  import { models } from "$lib/stores/models";
  import { files } from "$lib/stores/files";
  import { fullscreen, ollamaIsActivated } from "$lib/stores/states";
  import AssistantMessage from "./chat/AssistantMessage.svelte";
  import UserMessage from "./chat/UserMessage.svelte";
  import Tooglefullsize from "./chat/Tooglefullsize.svelte";
  import Input from "./chat/Input.svelte";
  import LoadingModel from "./chat/LoadingModel.svelte";
  import RagState from "./chat/RagState.svelte";

  let chatModel = "";
  let rag = { state: false, collection: null };
  let collectionID = "";
  let active = false;
  let chatContainer = null;
  let ram = false;
  let writing = false;

  const { input, messages, setMessages, append, stop } = useChat({
    onResponse: () => {
      ram = false;
      writing = true;
    },
    onFinish: updateChat,
  });

  $: {
    if (browser) {
      const currentChat = $history.find((conv) => conv.id === $page.params.id);
      if (currentChat) {
        // Set up all chat parameters
        chatModel = currentChat.model;
        collectionID = currentChat.id;
        active = $models.find((model) => model.image === chatModel.image);

        if ($files) {
          const files = JSON.parse(localStorage.getItem("files")) ?? [];
          const chatFiles = files.filter((f) => f.chat === $page.params.id);
          if (chatFiles.length > 0) {
            rag = {
              state: true,
              collection: collectionID,
            };
          } else {
            rag.state = false;
          }
        }

        setMessages(currentChat.messages);
        // chat handler if first message is the first from user and the model is installed, triggering a conversation
        if (
          currentChat.messages.length === 2 &&
          currentChat.messages[1].role === "user" &&
          active
        ) {
          ram = true;
          append(
            { role: "user", content: currentChat.messages[1].content },
            {
              options: { body: { model: chatModel, rag } },
            }
          );
        }
      }
    }
  }

  async function renameChat(chat) {
    // generate a title for the chat fetching /api/rename-chat
    const response = await fetch("/api/rename-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: chatModel.image, messages: chat }),
    });

    let title = await response.json();
    title = title.replace(/"/g, "");

    history.update((chats) => {
      const index = chats.findIndex((conv) => conv.id === $page.params.id);
      chats[index].name = title;
      return chats;
    });
  }

  function handleSubmit() {
    if ($input.includes("/") && $input.indexOf("/") === 0) {
      return;
    }
    if ($input) {
      ram = true;
      append(
        { role: "user", content: $input },
        {
          options: { body: { model: chatModel, rag } },
        }
      );
    }
    $input = "";
  }

  function updateChat() {
    writing = false;
    let chat = $messages.map((message) => {
      return {
        role: message.role,
        content: message.content,
      };
    });

    if (chat.length === 2) {
      renameChat(chat);
    }

    history.update((chats) => {
      const index = chats.findIndex((conv) => conv.id === $page.params.id);
      chats[index].messages = chat;
      return chats;
    });
  }

  function regenerate(event) {
    // remove last message in messages using setMessages
    const index = event.detail.index;
    const query = $messages[index - 1];

    // Remove the index message and the index-1 message
    setMessages((messages) => {
      messages.splice(index, 1);
      messages.splice(index - 1, 1);
      return messages;
    });

    // Append the new message
    append(
      { role: "user", content: query.content },
      {
        options: { body: { model: chatModel } },
      }
    );
  }

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
    <div class="flex gap-2 absolute top-4 left-4 items-center">
      <span
        class=" bg-black-100 dark:bg-black-600 px-3 font-mono text-xs py-2 rounded-md"
        >{chatModel.image}</span
      >
      {#if rag.state}
        <RagState id={collectionID} />
      {/if}
    </div>

    <Tooglefullsize />

    <div bind:this={chatContainer} class="h-full overflow-y-auto pt-20 pb-32">
      <div class="w-full max-w-2xl mx-auto">
        {#each $messages as message, i}
          {#if message.role === "assistant"}
            <AssistantMessage
              on:regenerate={regenerate}
              index={i}
              content={message.content}
              model={chatModel}
            />
          {/if}
          {#if message.role === "user"}
            <UserMessage content={message.content} />
          {/if}
        {/each}
        {#if ram}
          <LoadingModel />
        {/if}
      </div>
      {#if $ollamaIsActivated && active}
        <Input
          bind:value={$input}
          on:submit={handleSubmit}
          on:stop={stop}
          {writing}
          id={collectionID}
        />
      {:else}
        <div
          class="absolute bottom-2 left-2 right-2 pb-10 z-10 bg-gradient-to-r from-white dark:from-black-800 from-80% to-90%"
        >
          <div
            class="w-full max-w-2xl mx-auto bg-black-100 text-black-400 rounded-lg p-4 flex items-center gap-2 justify-center"
          >
            <svg
              width="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_21_7860)">
                <path
                  d="M18 8H20C20.2652 8 20.5196 8.10536 20.7071 8.29289C20.8946 8.48043 21 8.73478 21 9V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V9C3 8.73478 3.10536 8.48043 3.29289 8.29289C3.48043 8.10536 3.73478 8 4 8H6V7C6 5.4087 6.63214 3.88258 7.75736 2.75736C8.88258 1.63214 10.4087 1 12 1C13.5913 1 15.1174 1.63214 16.2426 2.75736C17.3679 3.88258 18 5.4087 18 7V8ZM11 15.732V18H13V15.732C13.3813 15.5119 13.6793 15.1721 13.8478 14.7653C14.0162 14.3586 14.0458 13.9076 13.9319 13.4823C13.8179 13.057 13.5668 12.6813 13.2175 12.4132C12.8682 12.1452 12.4403 11.9999 12 11.9999C11.5597 11.9999 11.1318 12.1452 10.7825 12.4132C10.4332 12.6813 10.1821 13.057 10.0681 13.4823C9.9542 13.9076 9.98376 14.3586 10.1522 14.7653C10.3207 15.1721 10.6187 15.5119 11 15.732ZM16 8V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V8H16Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_21_7860">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            Your chat model is not installed. Please
            <a href="/models" class="underline">install it</a> to resume the chat.
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
