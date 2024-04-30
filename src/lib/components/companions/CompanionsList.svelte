<script>
  import { browser } from "$app/environment";
  import { companions } from "$lib/stores/companions";

  if (browser) {
    // if companions in local storage is empty, set it to companions store
    if (!localStorage.getItem("companions")) {
      localStorage.setItem("companions", JSON.stringify($companions));
    } else {
      // if companions in local storage is not empty, multiple steps : match the ones in local storage with the ones in the store, the add their updated values to the store
      const localCompanions = JSON.parse(localStorage.getItem("companions"));
      const updatedCompanions = $companions.map((companion) => {
        const localCompanion = localCompanions.find(
          (localCompanion) => localCompanion.model === companion.model
        );
        if (localCompanion) {
          return { ...companion, ...localCompanion };
        }
        return companion;
      });

      companions.set(updatedCompanions);
    }
  }

  $: console.log($companions);
</script>

<ul class="grid grid-cols-4 gap-4">
  {#each $companions as companion}
    <div
      class="flex items-center justify-between p-4 flex-col border border-black-200 dark:border-black-600 rounded-xl"
    >
      <div class="rounded-full bg-black-100 w-10 h-10 mb-2"></div>
      <h2 class="text-lg font-semibold">{companion.name.split(":")[0]}</h2>
      <span class="text-sm opacity-50 capitalize"
        >{companion.details.family}</span
      >
    </div>
  {/each}
</ul>
