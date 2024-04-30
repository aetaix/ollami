<script>
  import { page } from "$app/stores";
  export let url = "";
</script>

<a
  href="/{url}"
  class="
      {$page.url.pathname.includes(url)
    ? 'bg-white dark:bg-black-700 shadow-lg  border-black-200 dark:border-black-600'
    : 'hover:bg-black-100 border-transparent dark:hover:bg-black-800'}
      flex px-4 items-center gap-2 py-3 rounded-xl border text-sm transition-all active:scale-95"
>
  <slot />
</a>
