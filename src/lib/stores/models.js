import { writable } from "svelte/store";
export const models = writable([
  {
    name: "Mistral",
    image: "mistral:latest",
    parameters: "7B",
    size: 4.1,
    description: `Mistral is a 7.3B parameter model, distributed with the Apache license. It is available in both instruct (instruction following) and text completion.

      The Mistral AI team has noted that Mistral 7B:
      
      Outperforms Llama 2 13B on all benchmarks
      Outperforms Llama 1 34B on many benchmarks
      Approaches CodeLlama 7B performance on code, while remaining good at English tasks`,
    installed: false,
    derived: false,
  },
  {
    name: "Mixtral",
    image: "mixtral:latest",
    parameters: "8x7B",
    size: 26,
    description: `The Mixtral-8x7B Large Language Model (LLM) is a pretrained generative Sparse Mixture of Experts. It outperforms Llama 2 70B on many benchmarks.

    As of December 2023, it is the strongest open-weight model with a permissive license and the best model overall regarding cost/performance trade-offs.`,
    installed: false,
    derived: false,
  },
  {
    name: "Gemma",
    image: "gemma:latest",
    parameters: "7B",
    size: 4.8,
    description:
      "Gemma is a new open model developed by Google and its DeepMind team. It’s inspired by Gemini models at Google.",
    installed: false,
    derived: false,
  },
  {
    name: "Gemma",
    image: "gemma:2b",
    parameters: "2B",
    size: 1.4,
    description:
      "Gemma is a new open model developed by Google and its DeepMind team. It’s inspired by Gemini models at Google.",
    installed: false,
    derived: false,
  },
  {
    name: "Llama 2",
    image: "llama2",
    parameters: "7B",
    size: 3.8,
    description:
      "Llama 2 is released by Meta Platforms, Inc. This model is trained on 2 trillion tokens, and by default supports a context length of 4096. Llama 2 Chat models are fine-tuned on over 1 million human annotations, and are made for chat.",
    installed: false,
    derived: false,
  },
  {
    name: "Llama 2 Uncensored",
    image: "llama2-uncensored",
    parameters: "7B",
    size: 3.8,
    description:
      "Llama 2 Uncensored is based on Meta’s Llama 2 model, and was created by George Sung and Jarrad Hope using the process defined by Eric Hartford in his blog post.",
    installed: false,
    derived: false,
  },
  {
    name: "Llama 2 13B",
    image: "llama2:13b",
    parameters: "13B",
    size: 7.3,
    description:
      "Llama 2 is released by Meta Platforms, Inc. This model is trained on 2 trillion tokens, and by default supports a context length of 4096. Llama 2 Chat models are fine-tuned on over 1 million human annotations, and are made for chat.",
    installed: false,
    derived: false,
  },
  {
    name: "Llama 2 70B",
    image: "llama2:70b",
    parameters: "70B",
    size: 39,
    description:
      "Llama 2 is released by Meta Platforms, Inc. This model is trained on 2 trillion tokens, and by default supports a context length of 4096. Llama 2 Chat models are fine-tuned on over 1 million human annotations, and are made for chat.",
    installed: false,
    derived: false,
  },
  {
    name: "Dolphin Phi",
    image: "dolphin-phi",
    parameters: "2.7B",
    size: 1.6,
    description: "Dolphin Phi / 2.7B",
    installed: false,
    derived: false,
  },
  {
    name: "Phi-2",
    image: "phi",
    parameters: "2.7B",
    size: 1.7,
    description:
      "Phi-2 is a small language model capable of common-sense reasoning and language understanding. It showcases “state-of-the-art performance” among language models with less than 13 billion parameters.",
    installed: false,
    derived: false,
  },
  {
    name: "Neural Chat",
    image: "neural-chat",
    parameters: "7B",
    size: 4.1,
    description:
      "NeuralChat is a fine-tuned model released by Intel that’s based on Mistral, designed to be used for high-performance chatbot applications.",
    installed: false,
    derived: false,
  },
  {
    name: "Starling",
    image: "starling-lm",
    parameters: "7B",
    size: 4.1,
    description: `Starling-7B is an open (non-commercial) large language model (LLM) trained by reinforcement learning from AI feedback. (RLAIF)

    The model harnesses the power of our new GPT-4 labeled ranking dataset, Nectar, and our new reward training and policy tuning pipeline. Starling-7B-alpha scores 8.09 in MT Bench with GPT-4 as a judge, outperforming every model to date on MT-Bench except for OpenAI’s GPT-4 and GPT-4 Turbo.`,
    installed: false,
    derived: false,
  },
  {
    name: "Code Llama",
    image: "codellama",
    parameters: "7B",
    size: 3.8,
    description:
      "Code Llama is a model for generating and discussing code, built on top of Llama 2. It’s designed to make workflows faster and efficient for developers and make it easier for people to learn how to code. It can generate both code and natural language about code. Code Llama supports many of the most popular programming languages used today, including Python, C++, Java, PHP, Typescript (Javascript), C#, Bash and more.",
    installed: false,
    derived: false,
  },

  {
    name: "Orca Mini",
    image: "orca-mini",
    parameters: "3B",
    size: 1.9,
    description:
      "Orca Mini is a Llama and Llama 2 model trained on Orca Style datasets created using the approaches defined in the paper, Orca: Progressive Learning from Complex Explanation Traces of GPT-4. There are two variations available. The original Orca Mini based on Llama in 3, 7, and 13 billion parameter sizes, and v3 based on Llama 2 in 7, 13, and 70 billion parameter sizes.",
    installed: false,
    derived: false,
  },
  {
    name: "Deepseek Coder",
    image: "deepseek-coder:base",
    parameters: "1.3B",
    size: 0.77,
    description:
      "DeepSeek Coder is trained from scratch on both 87% code and 13% natural language in English and Chinese. Each of the models are pre-trained on 2 trillion tokens.",
    installed: false,
    derived: false,
  },
  {
    name: "Deepseek Coder",
    image: "deepseek-coder:base",
    parameters: "6.7B",
    size: 3.8,
    description:
      "DeepSeek Coder is trained from scratch on both 87% code and 13% natural language in English and Chinese. Each of the models are pre-trained on 2 trillion tokens.",
    installed: false,
    derived: false,
  },
  {
    name: "Vicuna",
    image: "vicuna",
    parameters: "7B",
    size: 3.8,
    description:
      "Vicuna is a chat assistant model. It includes 3 different variants in 3 different sizes. v1.3 is trained by fine-tuning Llama and has a context size of 2048 tokens. v1.5 is trained by fine-tuning Llama 2 and has a context size of 2048 tokens. v1.5-16k is trained by fine-tuning Llama 2 and has a context size of 16k tokens. All three variants are trained using conversations collected from ShareGPT.",
    installed: false,
    derived: false,
  },
  {
    name: "LLaVA",
    image: "llava",
    parameters: "7B",
    size: 4.5,
    description:
      "LLaVA is a multimodal model that combines a vision encoder and Vicuna for general-purpose visual and language understanding, achieving impressive chat capabilities mimicking spirits of the multimodal GPT-4.",
    installed: false,
    derived: false,
  },
]);

export const currentModel = writable({
  name: "Mistral",
  image: "mistral:latest",
  parameters: "7B",
  size: 4.1,
  description: `Mistral is a 7.3B parameter model, distributed with the Apache license. It is available in both instruct (instruction following) and text completion.

      The Mistral AI team has noted that Mistral 7B:
      
      Outperforms Llama 2 13B on all benchmarks
      Outperforms Llama 1 34B on many benchmarks
      Approaches CodeLlama 7B performance on code, while remaining good at English tasks`,
  installed: false,
  derived: false,
});
