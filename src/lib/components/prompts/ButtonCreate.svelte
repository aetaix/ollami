<script>
  import { create, currentPrompt } from "$lib/stores/prompts";
  function createMode() {
    create.set(true);
    currentPrompt.set(null);
  }
</script>

<button
  on:click={createMode}
  class="border flex gap-2 items-center border-black-200 z-10 hover:bg-black-50 transition-colors text-black bg-white shadow px-4 py-2 rounded-lg"
>
  Create a prompt</button
>
