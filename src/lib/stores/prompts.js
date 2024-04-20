import { writable } from 'svelte/store';

export const prompts = writable([]);

export const currentPrompt = writable(0);

export const create = writable(false);

export const modal = writable(false);