<script lang="ts">
	// call server endpoint to avoid bundling Node-only 'ollama' package in the browser

	let { model } = $props();

	// state
	let isDownloading = $state(false);
	let progress = $state(0); // 0 - 100
	let status = $state<string | null>(null);
	const isComplete = () => progress === 100;

	function reset() {
		progress = 0;
		status = null;
	}

	async function pullModel() {
		if (isDownloading || isComplete()) return; // prevent unnecessary calls
		isDownloading = true;
		reset();
		status = 'Starting…';
		try {
			const resp = await fetch('/api/models/ollama/pull', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ model: model.api })
			});
			if (!resp.ok || !resp.body) throw new Error('Failed to start pull');
			const reader = resp.body.getReader();
			const decoder = new TextDecoder();
			let buffer = '';
			while (true) {
				const { value, done } = await reader.read();
				if (done) break;
				buffer += decoder.decode(value, { stream: true });
				let idx;
				while ((idx = buffer.indexOf('\n')) !== -1) {
					const line = buffer.slice(0, idx).trim();
					buffer = buffer.slice(idx + 1);
					if (!line) continue;
					try {
						const part = JSON.parse(line);
						if (part?.status) status = part.status;
						if (
							typeof part?.total === 'number' &&
							typeof part?.completed === 'number' &&
							part.total > 0
						) {
							progress = Math.min(100, Math.round((part.completed / part.total) * 100));
						}
					} catch (e) {
						console.error('Parse error', e);
					}
				}
			}
			if (!isComplete()) {
				progress = 100;
			}
			status = 'Completed';
		} catch (e: any) {
			console.error('Model pull failed', e);
			status = e?.message || 'Failed';
		} finally {
			isDownloading = false;
		}
	}
</script>

<button
	onclick={pullModel}
	class="flex flex-col items-start gap-1 text-sm opacity-70 transition hover:opacity-100 disabled:opacity-40"
	disabled={isDownloading || isComplete()}
	aria-busy={isDownloading}
	aria-label={`Download model ${model.name}${isDownloading ? ' (downloading)' : ''}`}
>
	<span>{model.name}</span>
	{#if isDownloading}
		<span class="text-xs tabular-nums">{progress}% {status}</span>
		<div
			class="h-1 w-full overflow-hidden rounded bg-neutral-700"
			role="progressbar"
			aria-valuenow={progress}
			aria-valuemin="0"
			aria-valuemax="100"
		>
			<div
				class="h-full bg-green-500 transition-[width] duration-150"
				style={`width:${progress}%`}
			></div>
		</div>
	{:else if isComplete()}
		<span class="text-xs text-green-500">Downloaded</span>
	{/if}
</button>
