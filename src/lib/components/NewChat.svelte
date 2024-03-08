<script>
  import { fullscreen, ollamaIsActivated } from "$lib/stores/states";
  import { currentModel } from "$lib/stores/models";
  import { history } from "$lib/stores/history";
  import ollama from "ollama";
  import { useChat } from "ai/svelte";
  import { goto } from "$app/navigation";
  //import DropdownModel from "$lib/components/models/DropdownModel.svelte";
  import AssistantMessage from "./chat/AssistantMessage.svelte";
  import UserMessage from "./chat/UserMessage.svelte";
  import Tooglefullsize from "./chat/Tooglefullsize.svelte";
  import Welcome from "./chat/Welcome.svelte";
  import Input from "./chat/Input.svelte";

  const { input, messages, append } = useChat({
    //initialMessages: initialMessages,
    onFinish: createChat,
  });

  let modelSafetyFrame = [
    {
      role: "system",
      content:
        "You are a helpful assistant. You are going to help the user with its query. Answer in their language. Try to give short answers. If you don't know the answer, just say so.",
    },
  ];

  function handleSubmit() {
    let options = { body: { currentModel: $currentModel } };

    if ($currentModel.derived) {
      options.initialMessages = modelSafetyFrame;
    }

    if ($input) {
      append(
        { role: "user", content: $input },
        {
          options: options,
        }
      );
      $input = "";
    }
  }

  async function createChat() {
    let chat = $messages.map((message) => {
      return {
        role: message.role,
        content: message.content,
      };
    });
    await ollama
      .generate({
        model: $currentModel.image,
        prompt: `Considering the following conversation, capture the main topic and use it to generate a short title for the chat. The chat's message: ${JSON.stringify(chat)}.
        The Title:
        `,
      })
      .then((response) => {
        console.log(response);
        // remove " " from response.response;

        let title = response.response.replace(/"/g, "");

        let newchat = {
          id: Math.random().toString(36).substring(2, 11),
          name: title,
          model: $currentModel,
          messages: chat,
        };

        history.update((chats) => {
          chats.unshift(newchat);
          return chats;
        });

        goto(`/chat/${newchat.id}`);
      })
      .catch((error) => {
        console.log(error);
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
    <Tooglefullsize />

    <div bind:this={chatContainer} class="h-full overflow-y-auto pt-20 pb-32">
      {#if $messages.length < 1}
        <Welcome />
      {:else}
        <div class="w-full max-w-2xl mx-auto">
          {#each $messages as message}
            {#if message.role === "assistant"}
              <AssistantMessage
                content={message.content}
                model={$currentModel}
              />
            {/if}
            {#if message.role === "user"}
              <UserMessage content={message.content} />
            {/if}
          {/each}
        </div>
      {/if}
      {#if $ollamaIsActivated}
        <Input bind:value={$input} onSubmit={handleSubmit} />
      {/if}
    </div>
  </div>
</div>
