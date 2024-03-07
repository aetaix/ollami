import { writable } from 'svelte/store';
export let ollamaIsActivated = writable(false);
export let fullscreen = writable(false);
export const dropdownModelsOpen = writable(false);
export const modalModelsOpen = writable(false);