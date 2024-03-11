<script>
  import { models, currentModel } from "$lib/stores/models";
  import "../app.css";
  export let data;

  models.set(data.props.models);

  $: if ($models) {
    currentModel.set($models.find((model) => model.installed));
  }
  
</script>

<slot />
