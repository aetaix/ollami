<script>
  import SvelteMarkdown from "svelte-markdown";
  import Logo from "../sidebar/Logo.svelte";
  //import { currentModel } from "$lib/stores";
  export let content = "";
  export let model = "mistral:latest";

</script>

<div class="mb-4 p-4 rounded-xl bg-black-100 dark:bg-black-700">
  <div class="flex gap-4 items-center">
    <div class="w-8 h-8 shrink-0">
      <Logo />
    </div>
    <p class="font-semibold flex items-center gap-1">
      modelbase <span class="bg-black-200 dark:bg-black-800  p-1 rounded text-xs"
        >{model}</span
      >
    </p>
  </div>
  <div class="mt-2 pl-12 prose dark:prose-invert max-w-none">
    <SvelteMarkdown source={content} />
  </div>
</div>



