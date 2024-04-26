<script>
  import { toggleMode, mode } from "mode-watcher";
  import Moon from "../icons/Moon.svelte";
  import Sun from "../icons/Sun.svelte";
</script>

<button
  on:click={toggleMode}
  class="w-full outline outline-4 outline-white dark:outline-black-800 flex items-center relative rounded-lg bg-white dark:bg-black-800"
>
  <div
    class="w-1/2 left-0 overflow-hidden bg-black-100 dark:bg-black-700 bottom-0 rounded-lg absolute top-0 transition-transform {$mode ===
    'dark'
      ? 'translate-x-full'
      : ''}"
  ></div>
  <div
    class="w-1/2 p-3 relative text-sm flex items-center gap-2 justify-center"
  >
    <Sun />Light
  </div>
  <div
    class="w-1/2 p-3 relative text-sm flex items-center gap-2 justify-center"
  >
    <Moon />Dark
  </div>
</button>
