<script>
  import { browser } from "$app/environment";
  import { prompts, create, currentPrompt } from "$lib/stores/prompts";
  let prompt = {
    name: "",
    command: "",
    content: "",
  };

  function createPrompt() {
    prompts.update((prompts) => {
      return [...prompts, prompt];
    });
    create.set(false);
    currentPrompt.set($prompts.length - 1);
  }


  function autofill() {
    prompt.command = prompt.name.toLowerCase().replace(/\s/g, "-");
  }

  $: if (browser) {
    localStorage.setItem("prompts", JSON.stringify($prompts));
  }
</script>

<div class="p-4">
  <header class="flex items-center justify-between mb-4">
    <h2 class="font-bold">Create Prompt</h2>
   
  </header>

  <form on:submit|preventDefault={createPrompt} class="space-y-4">
    <div class="flex flex-col gap-2">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        on:keyup={autofill}
        bind:value={prompt.name}
        class="p-2 border text-sm border-black-200 rounded-lg"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label for="command">Command</label>
      <div class="flex items-center gap-2 bg-black-200 rounded-lg">
        <span class="pl-3 pr-1 font-bold">/</span>
        <input
          type="text"
          id="command"
          bind:value={prompt.command}
          class="p-2 border w-full text-sm border-black-200 rounded-lg rounded-l-none"
        />
      </div>
      <span class="block text-xs"
        >Only alphanumeric characters and hyphens are allowed; Activate this
        command by typing "/{prompt.command}" to chat input.</span
      >
    </div>
    <div class="flex flex-col gap-2">
      <label for="description">Description</label>
      <textarea
        id="description"
        bind:value={prompt.content}
        class="p-2 border text-sm border-black-200 rounded-lg"
      ></textarea>
      <span class="block text-xs"
        >Format your variables using square brackets like this: [variable] .
        Make sure to enclose them with '[' and ']' .</span
      >
    </div>
    <button
      type="submit"
      class="border flex gap-2 items-center border-black-200 z-10 hover:bg-black-50 transition-colors text-black bg-white shadow px-4 py-2 rounded-lg"
    >
      Create
    </button>
  </form>
</div>
