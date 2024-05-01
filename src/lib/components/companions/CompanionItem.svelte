<script>
  import { companions } from "$lib/stores/companions";
  import { goto } from "$app/navigation";
  import { currentModel } from "$lib/stores/models";
  import Trash from "../icons/Trash.svelte";
  export let name = "";
  export let model = "";
  export let description = "";
  export let image = "";
  export let parameters = "";

  async function deleteCompanion() {
    await fetch("/api/delete-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    });
    companions.update((models) =>
      models.filter((model) => model.model !== image)
    );
  }

  function setCurrentCompanion() {
    currentModel.set({ name, image: model, description });
    goto("/");
  }
</script>

<div
  class="flex group relative items-center justify-between hover:shadow transition-shadow p-4 pt-10 flex-col border border-black-200 dark:border-black-600 rounded-xl"
>
  <div class="rounded-full bg-black-100 w-12 h-12 mb-2"></div>
  <h2 class="text-lg font-semibold mb-2">{name}</h2>
  <span class=" bg-black-100 rounded p-1 text-sm block mb-4 text-black-700 font-mono">{model}</span>
  <p class="mb-4">{description}</p>
  <button
  on:click={setCurrentCompanion}
  class="w-full border border-black-200 bg-white p-2 text-sm rounded-lg shadow">Chat</button>
  <button on:click={deleteCompanion} class="group-hover:opacity-100 opacity-0 w-7 h-7 flex justify-center items-center rounded bg-black-100 hover:bg-black-200 transition-all absolute top-2 right-2">
  <Trash class="w-5" />
  </button>
</div>
