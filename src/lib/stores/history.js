import { writable } from 'svelte/store';
export const history = writable([]); // reflect the local storage history of conversations