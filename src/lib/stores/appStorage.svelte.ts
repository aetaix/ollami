interface Settings {
	background: string | null;
}

export const settings: Settings = $state({
	background: null
});
