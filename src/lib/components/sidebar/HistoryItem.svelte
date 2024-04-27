<script>
  import { page } from "$app/stores";
  import { history } from "$lib/stores/history";
  import { goto } from "$app/navigation";
  export let id = "";
  export let name = "";
  export let model = "";

  function deleteConversation(id) {
    history.update((conversations) => {
      return conversations.filter((conv) => conv.id !== id);
    });

    if ($page.params.id === id) {
      goto("/");
    }
  }

  let editMode = false;
  let input;

  function editModeOn() {
    editMode = true;
    // Focus input
    setTimeout(() => {
      input.focus();
    }, 0);
  }

  function editModeOff() {
    editMode = false;
    renameConversation(id, name);
  }

  function renameConversation(id, name) {
    history.update((conversations) =>
      conversations.map((conv) => (conv.id === id ? { ...conv, name } : conv))
    );
  }
</script>

<li
  class="
        {id === $page.params.id
    ? 'dark:bg-black-700 bg-black-100 '
    : ' hover:bg-black-100  dark:hover:bg-black-700'} 
    group group:hover:to-black-700 rounded-lg transition-colors flex justify-between items-center relative"
>
  {#if editMode}
    <input
      bind:this={input}
      on:blur={editModeOff}
      on:keydown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          editModeOff();
        }
      }}
      bind:value={name}
      type="text"
      class="border border-black-200 bg-transparent text-sm w-full p-1 focus:outline-black-400 dark:focus:outline-black-200 rounded-md"
    />
  {:else}
    <a
      href="/chat/{id}"
      class="w-full p-2 flex justify-start items-center gap-2"
    >
      {#if id === $page.params.id}
        <div class="shrink-0 text-{model.image.split(':')[0]}">
          <svg
            width="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 8C20 10.13 19.16 12.16 17.66 13.66C16.16 15.16 14.13 16 12 16V19.5C7 17.5 0 14.5 0 8C0 5.88 0.85 3.85 2.35 2.35C3.85 0.85 5.88 0 8 0H12C14.13 0 16.16 0.85 17.66 2.35C19.16 3.85 20 5.88 20 8Z"
              fill="url(#gradient)"
            />
            <defs>
              <linearGradient
                id="gradient"
                x1="16"
                y1="14"
                x2="6"
                y2="5.60527e-07"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="currentColor" />
                <stop offset="1" stop-color="currentColor" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      {:else}
        <div>
          <svg
            width="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0H12C14.1217 0 16.1566 0.842855 17.6569 2.34315C19.1571 3.84344 20 5.87827 20 8C20 10.1217 19.1571 12.1566 17.6569 13.6569C16.1566 15.1571 14.1217 16 12 16V19.5C7 17.5 0 14.5 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0V0ZM10 14H12C12.7879 14 13.5681 13.8448 14.2961 13.5433C15.0241 13.2417 15.6855 12.7998 16.2426 12.2426C16.7998 11.6855 17.2417 11.0241 17.5433 10.2961C17.8448 9.56815 18 8.78793 18 8C18 7.21207 17.8448 6.43185 17.5433 5.7039C17.2417 4.97595 16.7998 4.31451 16.2426 3.75736C15.6855 3.20021 15.0241 2.75825 14.2961 2.45672C13.5681 2.15519 12.7879 2 12 2H8C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 11.61 4.462 13.966 10 16.48V14Z"
              fill="currentColor"
            />
          </svg>
        </div>
      {/if}
      <div class="overflow-hidden min-h-5 flex-grow w-full relative text-sm">
        <span class=" w-[400px] absolute left-0 top-0 bottom-0">{name}</span>
        <div
          class="absolute group-hover:bg-gradient-to-r from-transparent from-60% to-80%
              {id === $page.params.id
            ? 'to-black-100 dark:to-black-700'
            : ' dark:to-black-800 group-hover:to-black-100 dark:group-hover:to-black-700 '}
               inset-0"
        ></div>
      </div></a
    >
  {/if}
  {#if !editMode}
    <button
      on:click={editModeOn}
      class="group-hover:opacity-100 opacity-0 absolute right-6 shrink-0 p-1 mr-2 text-sm text-left text-black dark:text-white  hover:bg-black-700/10 dark:hover:bg-black-600 rounded transition-all"
    >
      <svg
        width="14"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.9 3.85801L14.142 8.10101L4.242 18H0V13.757L9.9 3.85701V3.85801ZM11.314 2.44401L13.435 0.322007C13.6225 0.134536 13.8768 0.0292206 14.142 0.0292206C14.4072 0.0292206 14.6615 0.134536 14.849 0.322007L17.678 3.15101C17.8655 3.33853 17.9708 3.59284 17.9708 3.85801C17.9708 4.12317 17.8655 4.37748 17.678 4.56501L15.556 6.68601L11.314 2.44401Z"
          fill="currentColor"
        />
      </svg>
    </button>
    <button
      class="group-hover:opacity-100 opacity-0 absolute right-0 shrink-0 p-1 mr-2 text-sm text-left text-black dark:text-white hover:bg-black-700/10 dark:hover:bg-black-600 rounded transition-all"
      on:click={() => deleteConversation(id)}
    >
      <svg
        width="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_21_8752)">
          <path
            d="M17 4H22V6H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V6H2V4H7V2H17V4ZM9 9V17H11V9H9ZM13 9V17H15V9H13Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_21_8752">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  {/if}
</li>

<style>
  .text-llama3 stop:first-child {
    stop-color: #1d90fb;
  }
  .text-llama3 stop:last-child {
    stop-color: #0b6be1;
  }
  .text-mistral stop:first-child {
    stop-color: #f94128;
  }
  .text-mistral stop:last-child {
    stop-color: #ffd738;
  }
  .text-codegemma stop:first-child {
    stop-color: #f9dbbc;
  }
  .text-codegemma stop:last-child {
    stop-color: #468bef;
  }
</style>
