<script>
  import { models } from "$lib/stores/models";

  let installed = $models.filter((model) => model.installed);
    console.log(installed);
  // calculate total size of installed models
    let totalSize = installed.reduce((acc, model) => {
        return acc + parseFloat(model.size);
    }, 0);
</script>

<div class="rounded-full p-2 px-4 bg-black-100">
    <span class=" text-sm">{installed.length} models</span>
    |
    <span class=" text-sm">{totalSize} Go</span>
</div>