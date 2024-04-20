<script>
  import { page } from "$app/stores";
  import { history } from "$lib/stores/history";
  import { goto } from "$app/navigation";
  export let id = "";
  export let name = "";
  
  function deleteConversation(id) {
    history.update((conversations) => {
      return conversations.filter((conv) => conv.id !== id);
    });

    if ($page.params.id === id) {
      goto("/");
    }
  }
</script>

<li
  class="
        {id === $page.params.id
    ? 'dark:bg-black-700 bg-black-100 '
    : '  hover:bg-black-100  dark:hover:bg-black-700'} 
    group rounded-lg transition-colors flex justify-between items-center relative"
>
  <a
    href="/chat/{id}"
    class="w-full p-2 flex justify-start items-center gap-2"
  >
    {#if id === $page.params.id}
      <div class="shrink-0 text-black-400 dark:text-white">
        <svg
          width="18"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.77096 0.00543425C3.04545 0.125495 0.037737 3.19409 0.000517321 6.90714C-0.0118892 8.26665 0.365623 9.53611 1.02849 10.6149C1.12242 10.7667 1.14015 10.9521 1.08343 11.1198L0.432975 13.062C0.209657 13.7312 0.876069 14.3544 1.53184 14.0896L3.53993 13.2774C3.6959 13.2138 3.87137 13.2156 4.02202 13.2862C4.91706 13.7064 5.9149 13.9448 6.96769 13.9483C10.7411 13.966 13.887 10.9415 13.9969 7.18434C14.1156 3.16055 10.8102 -0.125222 6.76919 0.00366693L6.77096 0.00543425Z"
            fill="currentcolor"
          />
        </svg>
      </div>
    {:else}
      <div>
        <svg
          width="18"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.7709 0.00361241C6.77155 0.003592 6.77219 0.00357167 6.77284 0.00355144C7.29757 -0.01292 7.80989 0.0281853 8.3039 0.121005C11.6127 0.742692 14.1002 3.68432 13.9969 7.18434C13.887 10.9415 10.7411 13.966 6.96769 13.9483C5.91491 13.9448 4.91706 13.7064 4.02202 13.2862C3.87137 13.2156 3.6959 13.2138 3.53993 13.2774L1.53185 14.0896C0.87607 14.3544 0.209658 13.7312 0.432976 13.062L1.08343 11.1198C1.14015 10.9521 1.12242 10.7667 1.02849 10.6149C0.365623 9.53611 -0.0118886 8.26665 0.000517726 6.90714C0.0334338 3.62341 2.38964 0.843709 5.51097 0.161771C5.9179 0.0728675 6.33783 0.0196176 6.76731 0.00555293C6.76795 0.00553179 6.7686 0.00551073 6.76925 0.00548977C6.76982 0.00547119 6.77039 0.00545268 6.77096 0.00543425L6.76919 0.00366693C6.76976 0.00364869 6.77033 0.00363052 6.7709 0.00361241ZM6.94939 1.0002C10.3501 0.973212 13.0975 3.76029 12.9973 7.15484L12.9973 7.15511C12.9034 10.3653 10.2075 12.9635 6.97237 12.9483L6.97105 12.9483C6.06856 12.9453 5.21425 12.7412 4.447 12.381L4.44648 12.3808C4.031 12.186 3.56472 12.1878 3.16361 12.3509C3.16325 12.3511 3.1629 12.3512 3.16254 12.3514L1.50043 13.0236L2.03074 11.4402C2.03091 11.4397 2.03107 11.4392 2.03124 11.4387C2.17836 11.0022 2.13652 10.5062 1.87985 10.0903C1.31271 9.16689 0.989928 8.08179 1.00047 6.91673C1.03253 3.74223 3.61086 1.10779 6.80317 1.00492L6.94939 1.0002Z"
            fill="currentColor"
          />
        </svg>
      </div>
    {/if}
    <div class="overflow-hidden min-h-5 flex-grow w-full relative">
      <span class="text-sm w-[400px] absolute left-0 top-0 bottom-0"
        >{name}</span
      >
      <div
        class="absolute bg-gradient-to-r from-transparent from-70% to-90%
              {id === $page.params.id
          ? 'dark:to-black-700 to-black-100 '
          : ' dark:to-black-800 to-white group-hover:to-black-100 dark:group-hover:to-black-700 '}
               inset-0"
      ></div>
    </div>
  </a>
  <button
    class="group-hover:opacity-100 opacity-0 absolute right-0 shrink-0 p-1 mr-2 text-sm text-left hover:bg-black-700/10 dark:hover:bg-black-600 rounded transition-colors"
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
</li>

