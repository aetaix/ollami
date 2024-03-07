<script>
  import Models from "./Models.svelte";
  import CreateModel from "./CreateModel.svelte";
  import { dropdownModelsOpen, modalModelsOpen } from "$lib/stores/states";
  import { currentModel } from "$lib/stores/models";

  function openDropdown() {
    dropdownModelsOpen.set(true);
  }

  function closeDropdown() {
    dropdownModelsOpen.set(false);
  }

  function clickOutside(element, callbackFunction) {
    function onClick(event) {
      if (!element.contains(event.target)) {
        callbackFunction();
      }
    }

    document.body.addEventListener("click", onClick);

    return {
      update(newCallbackFunction) {
        callbackFunction = newCallbackFunction;
      },
      destroy() {
        document.body.removeEventListener("click", onClick);
      },
    };
  }

  function openModal() {
    modalModelsOpen.set(true);
    dropdownModelsOpen.set(false);
  }
</script>

<button
  on:click|stopPropagation={openDropdown}
  class="absolute top-4 left-4 bg-white dark:bg-black-800 p-2 border flex gap-6 items-center border-black-200 dark:border-black-700 rounded-md z-10 cursor-pointer"
>
  <div class="flex gap-2">
    <span class="capitalize"> {$currentModel?.name} </span>
    <span class="bg-black-200 dark:bg-black-600 rounded p-1 text-xs"
      >{$currentModel?.parameters}</span
    >
  </div>

  <svg
    width="14"
    viewBox="0 0 22 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L11 11L21 1"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</button>
{#if $dropdownModelsOpen}
  <div
    use:clickOutside={closeDropdown}
    class="z-10 absolute top-16 left-4 w-[340px] bg-white dark:bg-black-800 border border-black-200 dark:border-black-700 rounded-md shadow-lg"
  >
    <div class="p-2">
      <Models />
      <button
        on:click|stopPropagation={openModal}
        class="text-left w-full flex items-center justify-between mt-4 border transition-colors dark:border-black-600 border-black-200 bg-black-100 dark:bg-black-700 hover:text-white hover:bg-green p-2 rounded-md"
      >
        Create a derivated model
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 15L12 9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="square"
          />
          <path
            d="M15 12L9 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="square"
          />
        </svg>
      </button>
    </div>
  </div>
{/if}

{#if $modalModelsOpen}
  <CreateModel />
{/if}
