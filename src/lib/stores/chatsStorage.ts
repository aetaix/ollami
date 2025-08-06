import { persisted } from 'svelte-persisted-store';
import { type UIMessage } from 'ai';
import { goto } from '$app/navigation';

type Chat = {
	id: string;
	name: string;
	createdAt: string;
	model: {
		name: string;
		api: string;
	};
	messages: UIMessage[];
};

export const chats = persisted<Chat[]>('chats', []);

export function saveMessage(newMessage: any, chatId: string) {
	chats.update((chats) => [
		...chats.map((chat) => {
			if (chat.id === chatId) {
				const prevMessages = chat.messages || [];

				const updatedChat = { ...chat, messages: [...prevMessages, newMessage] };

				return updatedChat;
			}
			return chat;
		})
	]);
}

export function deleteChat(chatId: string) {
	chats.update((chats) => chats.filter((chat) => chat.id !== chatId));
	goto('/');
}

export async function renameChat(messages: any[], chatId: string) {
	// fetch api rename that return a name
	const response = await fetch('/api/rename', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ messages })
	});
	const data = await response.json();
	const name = data.name;
	chats.update((chats) => [
		...chats.map((chat) => {
			if (chat.id === chatId) {
				const updatedChat = {
					...chat,
					name
				};

				return updatedChat;
			}
			return chat;
		})
	]);
}
