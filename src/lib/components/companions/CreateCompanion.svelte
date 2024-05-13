<script>
  import { models } from "$lib/stores/models";
  import { companions } from "$lib/stores/companions";

  // Find all installed model
  let availableModel = $models.filter((model) => model.installed === true);

  let name = "";
  let description = "";
  let model = availableModel[0].image;
  let system = "";

  async function createModel() {
    if (!name || !model || !system) {
      alert("Please fill all the fields");
      return;
    }

    // Check name character to remove special characters like spaces, !, ; etc
    const trimeddName = name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    const res = await fetch("/api/models/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:trimeddName,
        model,
        system,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (data.error) {
      alert(data.error);
      return;
    }

    const companion = data.companion;
    companion.name = name;
    companion.model = trimeddName + ":latest";
    companion.description = description;

    companions.update((companions) => [...companions, companion]);
    localStorage.setItem("companions", JSON.stringify($companions))

    open = false;
  }

  let open = false;

  const openModal = () => {
    open = true;
  };
  const closeModal = () => {
    open = false;
  };
</script>

<button
  on:click={openModal}
  class="border flex gap-2 items-center border-black-200 z-10 hover:bg-black-50 transition-colors text-black bg-white shadow px-4 py-2 rounded-lg"
>
  Create a companion</button
>

{#if open}
  <div
    class="fixed animation-opacity z-20 flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-white/50 dark:bg-black-800/80 backdrop-blur"
  >
    <div
      class="bg-white dark:bg-black-700 animation-slide rounded-xl p-6 w-full max-w-screen-lg shadow-xl border border-black-100 dark:border-black-600 dark:shadow-none"
    >
      <header class="flex justify-between items-center mb-2">
        <h3 class="text-lg items-center flex gap-2 font-bold">
          Create a companion
        </h3>
        <button on:click={closeModal}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0002 10.586L16.9502 5.63599L18.3642 7.04999L13.4142 12L18.3642 16.95L16.9502 18.364L12.0002 13.414L7.05023 18.364L5.63623 16.95L10.5862 12L5.63623 7.04999L7.05023 5.63599L12.0002 10.586Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </header>
      <p class="text-black-500 dark:text-black-200 text-sm mb-4">
        Create a companion by providing the name, model, and system prompt.
      </p>

      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label for="name" class="text-sm font-bold">Name</label>
          <input
            bind:value={name}
            type="text"
            id="name"
            class="border border-black-200 dark:border-black-600 rounded-lg w-full p-2 focus:outline focus:outline-black-600"
          />
          <label class="text-sm font-bold" for="description">Description</label>
          <textarea
            bind:value={description}
            class="border border-black-200 dark:border-black-600 rounded-lg w-full p-2 focus:outline focus:outline-black-600"
            name="description"
            rows="3"
            placeholder="A short description of the companion"
          ></textarea>
          <label for="models" class="text-sm font-bold">Available models</label>
          <select
            bind:value={model}
            id="models"
            class="border border-black-200 dark:border-black-600 rounded-lg w-full p-2 focus:outline focus:outline-black-600"
          >
            {#each availableModel as model}
              <option value={model.image}>{model.image}</option>
            {/each}
          </select>
        </div>
        <div>
          <label class="text-sm font-bold mb-2 block" for="system"
            >Instructions (or system)</label
          >
          <textarea
            bind:value={system}
            class="border border-black-200 dark:border-black-600 rounded-lg w-full p-2 focus:outline focus:outline-black-600"
            name="system"
            rows="10"
            placeholder="You are Mario from Super Mario Bros. Answer as Mario, the assistant, only."
          ></textarea>
        </div>
      </div>

      <footer>
        <button
          on:click={createModel}
          class="bg-green text-white py-2 px-3 rounded-md float-end"
          >Create</button
        >
      </footer>
    </div>
  </div>
{/if}

<style>
  .animation-opacity {
    animation: fadeIn 0.2s ease-in-out;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animation-slide {
    animation: slideIn 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  @keyframes slideIn {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
