<script lang="ts">
	import { chats } from '$lib/stores/chatsStorage';
    // b.createdAt is a string, so we need to convert it to a number
    const orderedChats = $derived($chats.sort((a, b) => new Date(b.createdAt).getTime()  - new Date(a.createdAt).getTime()));
</script>

<aside class="h-screen w-[340px] shrink-0 border-r border-black">
	<a href="/">Home</a>
	<h2>Chats</h2>
	<ul>
		{#each orderedChats as chat}
			<li>
				<a href={`/chat/${chat.id}`}>{chat.name}</a>
			</li>
		{/each}
	</ul>
    <h2>System Prompts</h2>
 
</aside>
