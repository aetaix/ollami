<script>
  import { browser } from "$app/environment";
  import { companions } from "$lib/stores/companions";
  import CompanionItem from "./CompanionItem.svelte";
  $: browser ?? localStorage.setItem("companions", JSON.stringify($companions));
</script>

<ul class="grid grid-cols-4 gap-4">
  {#each $companions as companion}
    <CompanionItem
      name={companion.name.split(":")[0]}
      model={companion.model}
      description={companion.description}
      image={companion.model}
      parameters={companion.details.parameter_size}
    />
  {/each}
</ul>
