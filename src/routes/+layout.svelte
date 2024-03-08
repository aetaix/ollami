<script>
  import { models, currentModel } from "$lib/stores/models";
  import "../app.css";
  export let data;

  models.set(data.props.models);
  currentModel.set(data.props.models[0]);

</script>

<slot />
