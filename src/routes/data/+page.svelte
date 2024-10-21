<script>
	import Collections from '$lib/components/collections/Collections.svelte';
	import File from '$lib/components/icons/File.svelte';
</script>

<div
	class="h-screen p-2
          w-4/5 pl-2 transition-all absolute right-0 top-0"
>
	<div
		class="h-full flex flex-col overflow-y-auto relative p-6 rounded-2xl border bg-white text-black dark:text-white border-black-200 dark:bg-black-800 dark:border-black-600 space-y-5"
	>
		<header class="flex justify-between items-center shrink-0 h-14">
			<h1 class="items-center flex gap-3 text-xl font-semibold">
				<File class="w-5" />
				Data
			</h1>
		</header>

		<Collections />
	</div>
</div>
