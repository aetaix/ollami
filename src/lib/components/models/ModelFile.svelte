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
    const create = await fetch("/api/create-model", {
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

    const resp = await create.json();
    if (resp.error) {
      alert(resp.error);
      return;
    }

    models.update((models) => {
      models.push({
        name,
        image: name+ ':latest',
        description: "Custom model",
        tags: [],
        size: 3,
        installed: true,
      
      });
      return models;
    });

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
  ><svg
    width="25"
    height="19"
    viewBox="0 0 25 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_89_52)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.18695 0.367457C8.03449 -0.122486 9.07309 -0.122486 9.92064 0.367457L15.7407 3.72847C16.5883 4.21841 17.1076 5.11991 17.1076 6.09489V12.8169C17.1076 13.7919 16.5883 14.6934 15.7407 15.1833L9.92064 18.5444C9.07309 19.0343 8.03449 19.0343 7.18695 18.5444L1.36684 15.1833C0.519302 14.6934 0 13.7919 0 12.8169V6.09489C0 5.11991 0.519302 4.21841 1.36684 3.72847L7.18695 0.367457ZM9.13678 1.7197C8.77425 1.50903 8.32843 1.50903 7.9659 1.7197L2.1458 5.08071C1.78326 5.29139 1.56281 5.67844 1.56281 6.09489V12.8169C1.56281 13.2334 1.78816 13.6204 2.1458 13.8311L7.9659 17.1921C8.32843 17.4028 8.77425 17.4028 9.13678 17.1921L14.9569 13.8311C15.3194 13.6204 15.5399 13.2334 15.5399 12.8169V6.09489C15.5399 5.67844 15.3145 5.29139 14.9569 5.08071L9.13678 1.7197Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23.6333 3.81171L17.8132 0.450697C16.9657 -0.0343469 15.9222 -0.0343469 15.0795 0.450697L9.25942 3.81171C8.41188 4.30165 7.89258 5.20315 7.89258 6.17813V12.9051C7.89258 13.88 8.41188 14.7815 9.25942 15.2666L15.0795 18.6325C15.9222 19.1175 16.9657 19.1175 17.8132 18.6325L23.6333 15.2666C24.476 14.7815 25.0002 13.88 25.0002 12.9051V6.17813C25.0002 5.20315 24.476 4.30165 23.6333 3.81171ZM23.4374 12.9051C23.4374 13.3215 23.2169 13.7086 22.8544 13.9143L17.0294 17.2802C16.6668 17.486 16.221 17.486 15.8585 17.2802L10.0384 13.9143C9.67584 13.7086 9.45049 13.3215 9.45049 12.9051V6.17813C9.45049 5.76168 9.67584 5.37463 10.0384 5.16395L15.8585 1.80294C16.221 1.59716 16.6668 1.59716 17.0294 1.80294L22.8544 5.16395C23.2169 5.37463 23.4374 5.76168 23.4374 6.17813V12.9051Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23.4371 6.17821V12.9051C23.4371 13.3216 23.2166 13.7086 22.8541 13.9144L17.0291 17.2803C16.6665 17.4861 16.2207 17.4861 15.8582 17.2803L10.0381 13.9144C9.67555 13.7086 9.4502 13.3216 9.4502 12.9051V6.17821C9.4502 5.76176 9.67555 5.3747 10.0381 5.16402L15.8582 1.80301C16.2207 1.59724 16.6665 1.59724 17.0291 1.80301L22.8541 5.16402C23.2166 5.3747 23.4371 5.76176 23.4371 6.17821Z"
        fill="white"
      />
      <path
        d="M16.1525 6.47698C16.27 6.11933 16.7795 6.11933 16.8922 6.47698L17.5144 8.38776C17.5536 8.50535 17.6467 8.59844 17.7643 8.63763L19.6749 9.25986C20.0325 9.37745 20.0325 9.88699 19.6749 9.99968L17.7643 10.6219C17.6467 10.6611 17.5536 10.7542 17.5144 10.8718L16.8922 12.7826C16.7746 13.1402 16.2651 13.1402 16.1525 12.7826L15.5303 10.8718C15.4911 10.7542 15.398 10.6611 15.2804 10.6219L13.3698 9.99968C13.0122 9.88209 13.0122 9.37255 13.3698 9.25986L15.2804 8.63763C15.398 8.59844 15.4911 8.50535 15.5303 8.38776L16.1525 6.47698Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_89_52">
        <rect width="25" height="19" fill="white" />
      </clipPath>
    </defs>
  </svg>
  Create a derivated model</button
>

{#if open}
  <div
    class="fixed animation-opacity z-10 flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-black/20"
  >
    <div
      class="bg-white animation-slide rounded-xl p-4 w-full max-w-[540px] shadow-xl border border-black-100"
    >
      <header class="flex justify-between items-center mb-2">
        <h3 class="text-lg items-center flex gap-2 font-bold">
          <svg
            width="25"
            viewBox="0 0 25 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_89_52)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.18695 0.367457C8.03449 -0.122486 9.07309 -0.122486 9.92064 0.367457L15.7407 3.72847C16.5883 4.21841 17.1076 5.11991 17.1076 6.09489V12.8169C17.1076 13.7919 16.5883 14.6934 15.7407 15.1833L9.92064 18.5444C9.07309 19.0343 8.03449 19.0343 7.18695 18.5444L1.36684 15.1833C0.519302 14.6934 0 13.7919 0 12.8169V6.09489C0 5.11991 0.519302 4.21841 1.36684 3.72847L7.18695 0.367457ZM9.13678 1.7197C8.77425 1.50903 8.32843 1.50903 7.9659 1.7197L2.1458 5.08071C1.78326 5.29139 1.56281 5.67844 1.56281 6.09489V12.8169C1.56281 13.2334 1.78816 13.6204 2.1458 13.8311L7.9659 17.1921C8.32843 17.4028 8.77425 17.4028 9.13678 17.1921L14.9569 13.8311C15.3194 13.6204 15.5399 13.2334 15.5399 12.8169V6.09489C15.5399 5.67844 15.3145 5.29139 14.9569 5.08071L9.13678 1.7197Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.6333 3.81171L17.8132 0.450697C16.9657 -0.0343469 15.9222 -0.0343469 15.0795 0.450697L9.25942 3.81171C8.41188 4.30165 7.89258 5.20315 7.89258 6.17813V12.9051C7.89258 13.88 8.41188 14.7815 9.25942 15.2666L15.0795 18.6325C15.9222 19.1175 16.9657 19.1175 17.8132 18.6325L23.6333 15.2666C24.476 14.7815 25.0002 13.88 25.0002 12.9051V6.17813C25.0002 5.20315 24.476 4.30165 23.6333 3.81171ZM23.4374 12.9051C23.4374 13.3215 23.2169 13.7086 22.8544 13.9143L17.0294 17.2802C16.6668 17.486 16.221 17.486 15.8585 17.2802L10.0384 13.9143C9.67584 13.7086 9.45049 13.3215 9.45049 12.9051V6.17813C9.45049 5.76168 9.67584 5.37463 10.0384 5.16395L15.8585 1.80294C16.221 1.59716 16.6668 1.59716 17.0294 1.80294L22.8544 5.16395C23.2169 5.37463 23.4374 5.76168 23.4374 6.17813V12.9051Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.4371 6.17821V12.9051C23.4371 13.3216 23.2166 13.7086 22.8541 13.9144L17.0291 17.2803C16.6665 17.4861 16.2207 17.4861 15.8582 17.2803L10.0381 13.9144C9.67555 13.7086 9.4502 13.3216 9.4502 12.9051V6.17821C9.4502 5.76176 9.67555 5.3747 10.0381 5.16402L15.8582 1.80301C16.2207 1.59724 16.6665 1.59724 17.0291 1.80301L22.8541 5.16402C23.2166 5.3747 23.4371 5.76176 23.4371 6.17821Z"
                fill="white"
              />
              <path
                d="M16.1525 6.47698C16.27 6.11933 16.7795 6.11933 16.8922 6.47698L17.5144 8.38776C17.5536 8.50535 17.6467 8.59844 17.7643 8.63763L19.6749 9.25986C20.0325 9.37745 20.0325 9.88699 19.6749 9.99968L17.7643 10.6219C17.6467 10.6611 17.5536 10.7542 17.5144 10.8718L16.8922 12.7826C16.7746 13.1402 16.2651 13.1402 16.1525 12.7826L15.5303 10.8718C15.4911 10.7542 15.398 10.6611 15.2804 10.6219L13.3698 9.99968C13.0122 9.88209 13.0122 9.37255 13.3698 9.25986L15.2804 8.63763C15.398 8.59844 15.4911 8.50535 15.5303 8.38776L16.1525 6.47698Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_89_52">
                <rect width="25" height="19" fill="white" />
              </clipPath>
            </defs>
          </svg> Create a derivated Model
        </h3>
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
