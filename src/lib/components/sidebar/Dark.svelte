<script>
  import { browser } from "$app/environment";
  import Moon from "../icons/Moon.svelte";
  import Sun from "../icons/Sun.svelte";

  let darkMode = true;

  function handleSwitchDarkMode() {
    darkMode = !darkMode;

    localStorage.setItem("theme", darkMode ? "dark" : "light");

    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }

  if (browser) {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      darkMode = true;
    } else {
      document.documentElement.classList.remove("dark");
      darkMode = false;
    }
  }
</script>


  <button
    on:click={handleSwitchDarkMode}
    class="w-full outline outline-4 outline-black-800 flex items-center relative rounded-lg bg-black-800 "
  >
    <div
      class="w-1/2 left-0  overflow-hidden bg-black-700 bottom-0 rounded-lg absolute top-0 transition-transform {darkMode
        ? 'translate-x-full'
        : ''}"
    ></div>
    <div class="w-1/2 p-3 relative text-sm flex items-center gap-2 justify-center"><Sun />Light</div>
    <div class="w-1/2 p-3 relative text-sm flex items-center gap-2 justify-center">
      <Moon />Dark</div>
  </button>
