import { persisted } from 'svelte-persisted-store';

export interface Companion {
	id: string;
	name: string;
	system: string;
}

export const companions = persisted<Companion[]>('companions', []);

export function getCompanion(id: string): Companion | undefined {
	let found: Companion | undefined;
	companions.update((list) => {
		found = list.find((c) => c.id === id);
		return list; // no mutation
	});
	return found;
}

export function createCompanion(partial: Companion) {
	const item: Companion = {
		...partial
	};
	item.id = (Math.random() * 23).toString();
	companions.update((list) => [item, ...list]);
	return item.id;
}

export function deleteCompanion(chatId: string) {
	companions.update((list) => list.filter((c) => c.id !== chatId));
	// return the first companion id, or undefined if none
	let first: string | undefined;
	companions.update((list) => {
		first = list[0]?.id;
		return list; // no mutation
	});
	return first;
}

export function updateCompanion(id: string, mutate: (companion: Companion) => Companion): void {
	companions.update((list) => {
		const idx = list.findIndex((c) => c.id === id);
		if (idx === -1) return list; // not found
		const current = list[idx];
		const updated = mutate(current);
		if (updated === current) return list; // unchanged
		const next = [...list];
		next[idx] = updated;
		return next;
	});
}
