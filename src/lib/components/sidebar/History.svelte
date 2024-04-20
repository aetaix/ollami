<script>
  import { browser } from "$app/environment";
  import { history } from "$lib/stores/history";
  import { goto } from "$app/navigation";
  import HistoryItem from "./HistoryItem.svelte";

  let search = "";

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
  class="bg-black-800 border-black-700 border shadow-lg rounded-2xl p-2 mb-6"
>
  <a
    href="/"
    class="flex w-full justify-between items-center rounded-lg hover:bg-black-700 transition-colors p-2"
  >
    <div class="text-sm flex items-center gap-2">
      <svg
        width="18"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.7709 0.00361241C6.77155 0.003592 6.77219 0.00357168 6.77284 0.00355144C7.29762 -0.0129214 7.80998 0.0281921 8.30403 0.121028C11.6128 0.742766 14.1002 3.68436 13.9969 7.18434C13.887 10.9415 10.7411 13.966 6.96769 13.9483C5.91491 13.9448 4.91706 13.7064 4.02202 13.2862C3.87137 13.2156 3.6959 13.2138 3.53993 13.2774L1.53185 14.0896C0.87607 14.3544 0.209658 13.7312 0.432976 13.062L1.08343 11.1198C1.14015 10.9521 1.12242 10.7667 1.02849 10.6149C0.365624 9.53611 -0.0118886 8.26665 0.000517726 6.90714C0.0334338 3.62342 2.38961 0.843742 5.51092 0.161783C5.91786 0.0728723 6.33781 0.0196182 6.76731 0.00555292C6.76795 0.00553178 6.7686 0.00551073 6.76925 0.00548976C6.76982 0.00547119 6.77039 0.00545268 6.77096 0.00543425L6.76919 0.00366693C6.76976 0.00364869 6.77033 0.00363052 6.7709 0.00361241ZM6.94939 1.0002C10.3501 0.973212 13.0975 3.76029 12.9973 7.15484L12.9973 7.1551C12.9034 10.3653 10.2075 12.9635 6.97237 12.9483L6.97105 12.9483C6.06856 12.9453 5.21425 12.7412 4.447 12.381L4.44648 12.3808C4.03106 12.186 3.56485 12.1878 3.16378 12.3509C3.16337 12.351 3.16296 12.3512 3.16254 12.3514L1.50043 13.0236L2.03074 11.4402C2.03092 11.4396 2.03111 11.4391 2.03129 11.4385C2.17833 11.0022 2.1365 10.5064 1.87997 10.0905C1.31276 9.16705 0.989928 8.08187 1.00047 6.91673C1.03252 3.74223 3.61086 1.10779 6.80317 1.00492L6.94939 1.0002Z"
          fill="currentColor"
        />
        <path
          d="M10 7.45882H7.49412V10H6.49412V7.45882H4V6.55294H6.49412V4H7.49412V6.55294H10V7.45882Z"
          fill="currentColor"
        />
      </svg>

      New chat
    </div>
    <span class="bg-black-700 p-1 rounded text-xs">⌘+o</span>
  </a>
  {#if $history.length > 0}
    <div class="border rounded-lg border-black-600 p-1 flex gap-2 my-2">
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
    <ul class="space-y-2 max-h-[50vh] overflow-y-auto mt-2">
      {#each filteredHistory as chat}
        {#if chat.name.length > 0}
          <HistoryItem id={chat.id} name={chat.name} />
        {/if}
      {/each}
    </ul>
  {/if}
</div>
