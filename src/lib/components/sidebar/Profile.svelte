<script>
  import {
    profilePicture,
    profileName,
    profileSetUpMode,
  } from "$lib/stores/globals";
  import { browser } from "$app/environment";

  if (browser) {
    if (localStorage.getItem("ai-tool-profile")) {
      const profile = JSON.parse(localStorage.getItem("ai-tool-profile"));
      profilePicture.set(profile.profilePicture);
      profileName.set(profile.profileName);
    } else {
      localStorage.setItem(
        "ai-tool-profile",
        JSON.stringify({
          profilePicture: $profilePicture,
          profileName: $profileName,
        })
      );
    }
  }

  $: {
    if (browser) {
      localStorage.setItem(
        "ai-tool-profile",
        JSON.stringify({
          profilePicture: $profilePicture,
          profileName: $profileName,
        })
      );
    }
  }

  function openProfileSetUp() {
    profileSetUpMode.set(true);
  }
</script>

<div class="rounded-xl bg-white-200 dark:bg-black-800 mt-4 p-2 flex gap-2">
  <button
    on:click={openProfileSetUp}
    class="w-8 h-8 rounded-full overflow-hidden shrink-0 cursor-pointer group relative"
  >
    <img src={$profilePicture} alt="" class="w-full object-cover" />
    <div
      class="h-full w-full bg-purple/90 absolute flex justify-center items-center top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <svg
        width="20"
        viewBox="0 0 45 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5158 9.99865C17.8137 9.07442 19.1213 9.07433 19.4194 9.99853L22.7667 20.3791C22.8648 20.6834 23.1026 20.9224 23.4064 21.0222L33.7166 24.4087C34.6338 24.71 34.6338 26.0076 33.7166 26.3088L23.4064 29.6954C23.1026 29.7951 22.8648 30.0342 22.7667 30.3385L19.4194 40.719C19.1213 41.6432 17.8137 41.6432 17.5158 40.7189L14.1701 30.3386C14.072 30.0342 13.8342 29.7951 13.5304 29.6953L3.22025 26.3088C2.30299 26.0076 2.30299 24.71 3.22025 24.4087L13.5304 21.0222C13.8342 20.9224 14.072 20.6833 14.1701 20.379L17.5158 9.99865Z"
          fill="white"
        />
        <path
          d="M34.65 3.28364C34.9478 2.35935 36.2555 2.35918 36.5536 3.28338L37.6729 6.75414C37.7711 7.0585 38.0089 7.29755 38.3127 7.39731L41.7796 8.53554C42.6969 8.8367 42.6971 10.1343 41.7799 10.4357L38.3125 11.5751C38.0088 11.6749 37.7711 11.9139 37.673 12.2182L36.5536 15.6891C36.2555 16.6133 34.9478 16.6131 34.65 15.6888L33.5318 12.2184C33.4337 11.914 33.1959 11.6749 32.8921 11.5751L29.4238 10.4357C28.5065 10.1343 28.5067 8.83662 29.4241 8.53551L32.8919 7.39733C33.1958 7.29757 33.4337 7.05839 33.5318 6.75389L34.65 3.28364Z"
          fill="white"
        />
      </svg>
    </div>
  </button>
  <input
    type="text"
    class="text-sm bg-transparent border border-transparent focus:outline-none transition-colors hover:border-white-400 hover:dark:border-white-500 rounded-lg w-full px-2"
    bind:value={$profileName}
  />
</div>
