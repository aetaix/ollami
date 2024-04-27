<script>
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import { history } from "$lib/stores/history";
  import { goto } from "$app/navigation";
  import HistoryItem from "./HistoryItem.svelte";

  let search = "";

  let isHome = $page.url.pathname === '/';

  if (browser) {
    if (localStorage.getItem("chats")) {
      history.set(JSON.parse(localStorage.getItem("chats")));
    } else {
      localStorage.setItem("chats", JSON.stringify([]));
      history.set([]);
    }
    window.addEventListener("keydown", (e) => {
      if (e.key === "o" && e.metaKey) {
        e.preventDefault();
        goto("/");
      }
    });
  }

  // if history changes, sync with localStorage
  $: {
    if (browser) {
      localStorage.setItem("chats", JSON.stringify($history));
    }
  }

  // if search changes, filter history
  let filteredHistory = [];

  $: {
    if (search.length > 0) {
      filteredHistory = $history.filter((conversation) => {
        return conversation.name.toLowerCase().includes(search.toLowerCase());
      });
    } else {
      filteredHistory = $history;
    }
  }
</script>

<div
  class="
  {$page.url.pathname.includes('chat') || isHome ? 'bg-white dark:bg-black-800 border-black-200 dark:border-black-700 shadow-lg' : 'hover:bg-black-100 border-transparent dark:hover:bg-black-800'}
   border  rounded-2xl
   space-y-2 p-2 mb-2 relative transition-colors"
>
  <a
    href="/"
    class="
    {isHome
      ? 'bg-black-100 dark:bg-black-700 '
      : 'hover:bg-black-100 dark:hover:bg-black-700'}
    flex w-full justify-between items-center rounded-lg transition-colors p-2"
  >
    <div class="text-sm flex items-center gap-2">
      <svg
        width="22"
        viewBox="0 0 24 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2223_30)">
          <path
            d="M17.87 12.52C17.8 12.88 17.69 13.24 17.55 13.58C17.25 14.31 16.8 14.97 16.25 15.53C15.69 16.08 15.03 16.52 14.3 16.83C13.57 17.13 12.79 17.28 12 17.28H10V19.76C4.47 17.25 2 14.89 2 11.28C2 9.69003 2.64 8.17003 3.76 7.04003C4.89 5.91003 6.41 5.28003 8 5.28003H10V3.28003H8C5.88 3.28003 3.85 4.13003 2.35 5.63003C0.85 7.13003 0 9.16003 0 11.28C0 17.78 7 20.78 12 22.78V19.28C14.13 19.28 16.16 18.44 17.66 16.94C18.86 15.74 19.64 14.18 19.9 12.52H17.87Z"
            fill="currentColor"
          />
          <path d="M23.18 3.28003H14.63V5.27003H23.18V3.28003Z" fill="currentColor" />
          <path d="M19.9 8.55V0L17.91 0V8.55H19.9Z" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clip0_2223_30">
            <rect width="23.18" height="22.78" fill="white" />
          </clipPath>
        </defs>
      </svg>

      New chat
    </div>
    <span
      class="
    {isHome
        ? 'bg-black-200 dark:bg-black-700 '
        : 'dark:bg-black-700 bg-black-100'}
     p-1 rounded text-xs">⌘+o</span
    >
  </a>
  {#if $history.length > 0}
    <div
      class="border rounded-lg border-black-200 dark:border-black-600 p-1 flex gap-2"
    >
      <svg
        width="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_21_7844)">
          <path
            d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.867 18 18 14.867 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18ZM19.485 18.071L22.314 20.899L20.899 22.314L18.071 19.485L19.485 18.071Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_21_7844">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <input
        bind:value={search}
        placeholder="Search a chat..."
        type="text"
        class="text-sm focus:outline-none bg-transparent w-full py-1"
      />
    </div>
    <ul class="space-y-2 max-h-[50vh] overflow-y-auto">
      {#each filteredHistory as chat}
        {#if chat.name.length > 0}
          <HistoryItem id={chat.id} name={chat.name} model={chat.model} />
        {/if}
      {/each}
    </ul>
  {/if}
</div>
