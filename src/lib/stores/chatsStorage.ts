import { persisted } from 'svelte-persisted-store';
import type { UIMessage } from 'ai';
import { goto } from '$app/navigation';

// Types -----------------------------------------------------------------------
export interface ChatMessage extends UIMessage {
	// extend with additional metadata if needed (e.g., id, pending, error)
}

export interface Chat {
	id: string;
	name: string;
	createdAt: string; // ISO timestamp
	model: {
		name: string;
		api: string;
	};
	messages: ChatMessage[];
}

// Store -----------------------------------------------------------------------
export const chats = persisted<Chat[]>('chats', []);

// Internal helpers ------------------------------------------------------------
function updateChat(chatId: string, mutate: (chat: Chat) => Chat): void {
	chats.update((list) => {
		const idx = list.findIndex((c) => c.id === chatId);
		if (idx === -1) return list; // not found
		const current = list[idx];
		const updated = mutate(current);
		if (updated === current) return list; // unchanged
		const next = [...list];
		next[idx] = updated;
		return next;
	});
}

// CRUD & utility API ----------------------------------------------------------
export function createChat(partial: Omit<Chat, 'createdAt' | 'messages'> & { messages?: ChatMessage[] }) {
	const chat: Chat = {
		...partial,
		createdAt: new Date().toISOString(),
		messages: partial.messages ?? []
	};
	chats.update((list) => [chat, ...list]);
	goto(`/chat/${chat.id}`);
	return chat.id;
}

export function getChat(chatId: string): Chat | undefined {
	let found: Chat | undefined;
	chats.update((list) => {
		found = list.find((c) => c.id === chatId);
		return list; // no mutation
	});
	return found;
}

export function appendMessage(chatId: string, message: ChatMessage) {
	updateChat(chatId, (chat) => ({ ...chat, messages: [...(chat.messages ?? []), message] }));
}

export function appendMessages(chatId: string, newMessages: ChatMessage[]) {
	if (!newMessages.length) return;
	updateChat(chatId, (chat) => ({ ...chat, messages: [...(chat.messages ?? []), ...newMessages] }));
}

// Backward compatible legacy name (was saveMessage)
export function saveMessage(newMessage: ChatMessage, chatId: string) {
	appendMessage(chatId, newMessage);
}

export function deleteChat(chatId: string) {
	chats.update((list) => list.filter((chat) => chat.id !== chatId));
	goto('/');
}

export async function renameChat(messages: ChatMessage[], chatId: string) {
	try {
		const response = await fetch('/api/rename', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ messages })
		});
		if (!response.ok) throw new Error(`Rename failed: ${response.status}`);
		const data = await response.json();
		const name: string | undefined = data?.name;
		if (!name) return;
		updateChat(chatId, (chat) => ({ ...chat, name }));
	} catch (e) {
		console.error('renameChat error', e);
	}
}
