<script>
  import { models } from "$lib/stores/models";
  // Find all installed model
  let availableModel = $models.filter((model) => model.installed === true);

  let name = "";
  let model = "";
  let system = "";

  async function createModel() {
    if (!name || !model || !system) {
      alert("Please fill all the fields");
      return;
    }
    fetch("/api/create-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        model,
        system,
      }),
    });

    closeModal;
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
  class="border border-black-200 z-10 hover:bg-black-50 transition-colors text-black bg-white shadow px-4 py-2 rounded-lg"
  >Create a modelfile</button
>

{#if open}
  <div
    class="fixed animation-opacity z-10 flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-black/20"
  >
    <div
      class="bg-white animation-slide rounded-xl p-4 w-full max-w-[540px] shadow-xl border border-black-100"
    >
      <header class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-bold">Create a derivated Model</h3>
        <button on:click={closeModal}
          ><svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0002 10.586L16.9502 5.63599L18.3642 7.04999L13.4142 12L18.3642 16.95L16.9502 18.364L12.0002 13.414L7.05023 18.364L5.63623 16.95L10.5862 12L5.63623 7.04999L7.05023 5.63599L12.0002 10.586Z"
              fill="black"
            />
          </svg>
        </button>
      </header>
      <p class="text-black-500 text-sm mb-4">
        In Ollama, you can create derived models by building upon open-source
        models and customizing their behavior through tailored instructions. By
        inheriting the foundational knowledge of existing models while
        introducing your own specifications, you gain the ability to fine-tune
        the Language Model (LLM) to better suit your unique use case.
      </p>
      <div class="space-y-2">
        <label for="name" class="text-sm font-bold">Name of the new model</label
        >
        <input
          bind:value={name}
          type="text"
          id="name"
          class="border border-black-200 rounded-lg w-full p-2"
        />
        <label for="models" class="text-sm font-bold">Available models</label>
        <select
          bind:value={model}
          id="models"
          class="border border-black-200 rounded-lg w-full p-2"
        >
          {#each availableModel as model}
            <option value={model.image}>{model.image}</option>
          {/each}
        </select>

        <label class="text-sm font-bold" for="system">System</label>
        <p class="text-sm text-black-500">
          The System prompt is what will fine tune the model.
        </p>
        <textarea
          bind:value={system}
          class="border border-black-200 rounded-lg w-full p-2"
          name="system"
          rows="3"
          placeholder="You are Mario from Super Mario Bros. Answer as Mario, the assistant, only."
        ></textarea>

        <button
          on:click={createModel}
          class="bg-green text-white py-2 px-3 rounded-md float-end"
          >Create</button
        >
      </div>
    </div>
  </div>
{/if}

<style>
    .animation-opacity {
        animation: fadeIn 0.3s ease-in-out;
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
        animation: slideIn 0.3s ease-in-out;
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