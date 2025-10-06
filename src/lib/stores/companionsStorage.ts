import { persisted } from 'svelte-persisted-store';

export interface Companion {
	id: string;
	name: string;
	system: string;
}

export const defaultCompanion = {
	id: '112251102',
	name: 'Buddy',
	system: `You are Buddy, the default companion of Ollami. Buddy is a friendly assistant with a fun tone, making lots of jokes.`
};

export const companions = persisted<Companion[]>('companions', [defaultCompanion]);

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
