<script>
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { fullscreen } from '$lib/stores/states';
	import { create, prompts } from '$lib/stores/prompts';
	import Prompt from '$lib/components/icons/Prompt.svelte';
	import Prompts from '$lib/components/prompts/Prompts.svelte';
	import ButtonCreate from '$lib/components/prompts/ButtonCreate.svelte';
	import Edit from '$lib/components/prompts/Edit.svelte';
	import Create from '$lib/components/prompts/Create.svelte';

	if ($prompts.length === 0) {
		create.set(true);
	}
</script>

<svelte:head>
	<title>Ollami - Svelte</title>
</svelte:head>

<main class="flex">
	<Sidebar />

	<div
		class="h-screen p-2 {$fullscreen
			? 'w-full'
			: 'w-4/5 pl-2'} transition-all absolute right-0 top-0"
	>
		<div
			class="h-full flex flex-col relative p-6 pt-4 rounded-2xl border bg-white text-black dark:text-white border-black-200 dark:bg-black-800 dark:border-black-600"
		>
			<header class="flex items-center justify-between mb-4 shrink-0">
				<h1 class="text-xl font-semibold flex gap-2 items-center">
					<Prompt class="w-5" />
					Prompt Libary
				</h1>
				<ButtonCreate />
			</header>

			<div class="border flex-grow border-black-200 dark:border-black-600 rounded-lg shadow flex">
				<div class="w-1/2 border-r border-black-200 dark:border-black-600">
					<Prompts />
				</div>
				<div class="w-1/2 min-h-[70vh]">
					{#if $create}
						<Create />
					{:else}
						<Edit />
					{/if}
				</div>
			</div>
		</div>
	</div>
</main>
