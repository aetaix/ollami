<script>
  import { fullscreen } from "$lib/stores/states";

  function toggleFullscreen() {
    fullscreen.update((value) => !value);
  }
</script>

<div
  class="absolute group top-1/2 -translate-y-1/2 left-0"
>
  <button
    on:click={toggleFullscreen}
    id="toggle-fullscreen"
    class="flex flex-col items-center w-6 h-6  {$fullscreen
      ? 'rotate-180'
      : ''}"
  >
    <div
      class="h-3 w-1 rounded-full bg-black-400 dark:bg-white group-hover:rotate-[15deg] transition-all translate-y-[0.15rem]"
    ></div>
    <div
      class="h-3 w-1 rounded-full bg-black-400 dark:bg-white group-hover:rotate-[-15deg] transition-all translate-y-[-0.15rem]"
    ></div>
   
  </button>
  <div class="absolute pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all opacity-0 left-6 top-1/2 -translate-y-1/2 p-2 w-[120px] text-center rounded-xl shadow-lg border border-black-200 dark:border-black-600 bg-white-100 dark:bg-black-900 text-sm">
    {$fullscreen ? 'Open' : 'Close'} Sidebar</div>
</div>

<style>
  #toggle-fullscreen {
    animation: slide 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation-fill-mode: backwards;
  }

  @keyframes slide {
    0% {
      transform: translateX(-1rem);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>