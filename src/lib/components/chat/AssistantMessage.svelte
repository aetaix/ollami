<script>
  import SvelteMarkdown from "svelte-markdown";
  import Logo from "../sidebar/Logo.svelte";
  //import { currentModel } from "$lib/stores";
  export let content = "";
  export let model = {};
</script>

<div class="mb-4 p-4 rounded-xl bg-black-100 dark:bg-black-700">
  <div class="flex gap-4 items-center">
    <div class="w-8 h-8 shrink-0 flex items-center justify-center">
      <img src="/icons/models/{model.icon || 'model.svg'}" class="w-6" alt="" />
    </div>
    <div class=" flex items-center gap-1 text-sm">
      <span class="text-black-500">
        {model.name}/
      </span>

      <span class="font-semibold">{model.image}</span>
    </div>
  </div>
  <div class="mt-2 pl-12 prose dark:prose-invert max-w-none">
    <SvelteMarkdown source={content} />
  </div>
</div>
