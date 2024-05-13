<script>
  import { goto } from "$app/navigation";
  async function installModel() {
    loading = true;
    // Add the model to the installation queue
    if (browser) {
      const queue = JSON.parse(localStorage.getItem("queue") || "[]");
      localStorage.setItem(
        "queue",
        JSON.stringify([...queue, "nomic-embed-text:latest"])
      );
    }
    await fetch("/api/models/pull", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: "nomic-embed-text:latest" }),
    });

    goto("/models");
  }
</script>

<div
  class="tooltip opacity-0 transition-all translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 bg-white dark:bg-black-700 shadow-lg p-2 border border-black-200 dark:border-black-600 rounded-lg absolute w-[200px] text-sm bottom-12 text-black dark:text-white"
>
  <p class="mb-2">Please install an embedding model to use this feature.</p>
  <button
    class="w-full border border-black-200 bg-white p-2 text-sm rounded-lg shadow"
    >Install nomic:latest</button
  >
</div>

<style>
  .tooltip::after {
    content: " ";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -8px;
    border-width: 8px;
    border-style: solid;
    border-color: rgb(255, 255, 255) transparent transparent transparent;
  }
</style>
