<script>
  import { models, currentModel } from "$lib/stores/models";
  import { companions } from "$lib/stores/companions";
  import "../app.css";
  export let data;

  models.set(data.props.models);
  companions.set(data.props.companions);

  $: if ($models) {
    currentModel.set($models.find((model) => model.installed)); // Set the current model by fidind the first installed model
  }
</script>

<slot />
