import { writable } from 'svelte/store';

export let initialModels = [
	{
		name: 'Llama3',
		image: 'llama3:latest',
		context: 8000,
		parameters: '8B',
		icon: 'llama.svg',
		size: 4.7,
		tags: ['chat', 'text', 'reasoning'],
		description: `Meta Llama 3, a family of models developed by Meta Inc. are new state-of-the-art , available in both 8B and 70B parameter sizes (pre-trained or instruction-tuned).

      Llama 3 instruction-tuned models are fine-tuned and optimized for dialogue/chat use cases and outperform many of the available open-source chat models on common benchmarks.`,
		installed: false,

		popularity: 2100
	},
	{
		name: 'Llama3.1',
		image: 'llama3.1:latest',
		context: 128000,
		parameters: '8B',
		icon: 'llama.svg',
		size: 4.7,
		tags: ['chat', 'text', 'reasoning'],
		description: `The upgraded versions of the 8B and 70B models are multilingual and have a significantly longer context length of 128K, state-of-the-art tool use, and overall stronger reasoning capabilities. This enables Meta’s latest models to support advanced use cases, such as long-form text summarization, multilingual conversational agents, and coding assistants.`,
		installed: false,

		popularity: 2100
	},
	{
		name: 'Llama3 Instruct',
		image: 'llama3:instruct',
		context: 8000,
		parameters: '8B',
		icon: 'llama.svg',
		size: 4.7,
		tags: ['chat', 'text', 'reasoning'],
		description: `Meta Llama 3, a family of models developed by Meta Inc. are new state-of-the-art , available in both 8B and 70B parameter sizes (pre-trained or instruction-tuned).

      Llama 3 instruction-tuned models are fine-tuned and optimized for dialogue/chat use cases and outperform many of the available open-source chat models on common benchmarks.`,
		installed: false,

		popularity: 2100
	},
	{
		name: 'Llama 2',
		image: 'llama2:13b',
		parameters: '13B',
		icon: 'llama.svg',
		tags: ['chat', 'text', 'reasoning'],
		size: 7.5,
		context: 4096,
		description:
			'Llama 2 is released by Meta Platforms, Inc. This model is trained on 2 trillion tokens, and by default supports a context length of 4096. Llama 2 Chat models are fine-tuned on over 1 million human annotations, and are made for chat.',
		installed: false,

		popularity: 1200
	},
	{
		name: 'Llama 2 Uncensored',
		image: 'llama2-uncensored:latest',
		parameters: '7B',
		icon: 'llama.svg',
		size: 3.8,
		tags: ['chat', 'text', 'uncensored'],
		description:
			'Llama 2 Uncensored is based on Meta’s Llama 2 model, and was created by George Sung and Jarrad Hope using the process defined by Eric Hartford in his blog post.',
		installed: false,

		popularity: 155.1
	},
	{
		name: 'Mistral',
		image: 'mistral:latest',
		icon: 'mistral.svg',
		parameters: '7B',
		context: 4096,
		size: 4.1,
		tags: ['chat', 'text', 'reasoning'],
		description: `Mistral is a 7.3B parameter model, distributed with the Apache license. It is available in both instruct (instruction following) and text completion.

      The Mistral AI team has noted that Mistral 7B:
      
      Outperforms Llama 2 13B on all benchmarks
      Outperforms Llama 1 34B on many benchmarks
      Approaches CodeLlama 7B performance on code, while remaining good at English tasks`,
		installed: false,

		popularity: 621.4
	},

	{
		name: 'Mixtral',
		image: 'mixtral:latest',
		icon: 'mistral.svg',
		parameters: '8x7B',
		context: 47000,
		size: 26,
		tags: ['chat', 'text', 'reasoning'],
		description: `The Mixtral-8x7B Large Language Model (LLM) is a pretrained generative Sparse Mixture of Experts. It outperforms Llama 2 70B on many benchmarks.

    As of December 2023, it is the strongest open-weight model with a permissive license and the best model overall regarding cost/performance trade-offs.`,
		installed: false,

		popularity: 230.4
	},
	{
		name: 'Aya',
		image: 'aya:latest',
		icon: 'cohere.svg',
		parameters: '8B',
		context: 4096,
		size: 4.8,
		tags: ['chat', 'text'],
		description: `Aya 23, released by Cohere, is a new family of state-of-the-art, multilingual models that support 23 languages. Aya is trained on a diverse range of text data and is optimized for performance on a wide range of tasks.`,
		installed: false,
		popularity: 34.4
	},
	{
		name: 'Granite Code 8B',
		image: 'granite-code:8b',
		icon: 'ibm.svg',
		parameters: '8B',
		context: 4096,
		size: 4.6,
		tags: ['code'],
		description: `Granite Code is a large language model trained by IBM Research. Granite Code is a family of decoder-only code model designed for code generative tasks (e.g. code generation, code explanation, code fixing, etc.).`,
		installed: false,
		popularity: 9
	},
	{
		name: 'Granite Code 3B',
		image: 'granite-code:3b',
		icon: 'ibm.svg',
		parameters: '3B',
		context: 4096,
		size: 2,
		tags: ['code'],
		description: `Granite Code is a large language model trained by IBM Research. Granite Code is a family of decoder-only code model designed for code generative tasks (e.g. code generation, code explanation, code fixing, etc.).`,
		installed: false,
		popularity: 9
	},
	{
		name: 'Command R',
		image: 'command-r:latest',
		icon: '',
		parameters: '35B',
		context: 128000,
		size: 20,
		tags: ['chat', 'RAG'],
		description: `Command R is a generative model optimized for long context tasks such as retrieval-augmented generation (RAG) and using external APIs and tools. As a model built for companies to implement at scale`,
		installed: false,

		popularity: 23.7
	},
	{
		name: 'Command R +',
		image: 'command-r-plus:latest',
		icon: '',
		parameters: '104B',
		context: 128000,
		size: 59,
		tags: ['chat', 'RAG'],
		description: `Command R is a generative model optimized for long context tasks such as retrieval-augmented generation (RAG) and using external APIs and tools. As a model built for companies to implement at scale`,
		installed: false,

		popularity: 20.3
	},
	{
		name: 'Mistral Open Orca',
		image: 'mistral-openorca:latest',
		icon: 'orca.svg',
		parameters: '7B',
		context: 4096,
		size: 4.1,
		tags: ['chat', 'text', 'reasoning'],
		description: `Mistral OpenOrca is a 7 billion parameter model, fine-tuned on top of the Mistral 7B model using the OpenOrca dataset.
  HuggingFace Leaderboard evals place this model as leader for all models smaller than 30B at the release time, outperforming all other 7B and 13B models.`,
		installed: false,

		popularity: 118.6
	},
	{
		name: 'Gemma',
		image: 'gemma:7b',
		parameters: '7B',
		context: 4096,
		size: 4.8,
		icon: 'gemma.svg',
		tags: ['chat', 'text'],
		description:
			'Gemma is a new open model developed by Google and its DeepMind team. It’s inspired by Gemini models at Google.',
		installed: false,

		popularity: 855.1
	},
	{
		name: 'Gemma',
		image: 'gemma:2b',
		parameters: '2B',
		context: 4096,
		size: 1.4,
		icon: 'gemma.svg',
		tags: ['chat', 'text', 'reasoning'],
		description:
			'Gemma is a new open model developed by Google and its DeepMind team. It’s inspired by Gemini models at Google.',
		installed: false,

		popularity: 855.1
	},
	{
		name: 'CodeGemma',
		image: 'codegemma:latest',
		icon: 'gemma.svg',
		parameters: '7B',
		context: 8000,
		size: 5,
		tags: ['code'],
		description: `CodeGemma is a collection of powerful, lightweight models that can perform a variety of coding tasks like fill-in-the-middle code completion, code generation, and natural language understanding.`,
		installed: false,

		popularity: 22.5
	},
	{
		name: 'Llama 2',
		image: 'llama2:7b',
		context: 4096,
		parameters: '7B',
		icon: 'llama.svg',
		size: 3.8,
		tags: ['chat', 'text', 'reasoning'],
		description:
			'Llama 2 is released by Meta Platforms, Inc. This model is trained on 2 trillion tokens, and by default supports a context length of 4096. Llama 2 Chat models are fine-tuned on over 1 million human annotations, and are made for chat.',
		installed: false,

		popularity: 1200
	},

	{
		name: 'llava',
		image: 'llava:7b',
		parameters: '7B',
		tags: ['multimodal', 'vision'],
		size: 4.7,
		description:
			'🌋 LLaVA is a novel end-to-end trained large multimodal model that combines a vision encoder and Vicuna for general-purpose visual and language understanding. Updated to version 1.6.',
		installed: false,

		popularity: 142.5
	},
	{
		name: 'Dolphin Phi',
		image: 'dolphin-phi',
		parameters: '2.7B',
		tags: ['small', 'uncensored'],
		size: 1.6,
		description:
			'Dolphin-phi 2.7B uncensored Dolphin model by Eric Hartford, based on the Phi language model by Microsoft Research. ',
		installed: false,

		popularity: 18
	},
	{
		name: 'Wizardlm2',
		image: 'wizardlm2:latest',
		parameters: '7B',
		tags: ['chat', 'text', 'code'],
		size: 4.1,
		description: `WizardLM-2 is a next generation state-of-the-art large language model with improved performance on complex chat, multilingual, reasoning and agent use cases. This family includes three cutting-edge models: wizardlm2:7b: fastest model, comparable performance with 10x larger open-source models, wizardlm2:8x22b: the most advanced model, and the best opensource LLM in Microsoft’s internal evaluation on highly complex tasks, wizardlm2:70b: model with top-tier reasoning capabilities for its size (coming soon)
      `,
		icon: 'microsoft.svg',
		installed: false,

		popularity: 30.4
	},
	{
		name: 'Phi 3 Mini',
		image: 'phi3:latest',
		parameters: '3.8B',
		tags: ['text', 'small', 'performance'],
		size: 2.3,
		context: 128000,
		icon: 'microsoft.svg',
		description:
			'Phi-3 Mini is a 3.8B parameters, lightweight, state-of-the-art open model trained with the Phi-3 datasets that includes both synthetic data and the filtered publicly available websites data with a focus on high-quality and reasoning dense properties. ',
		installed: false,

		popularity: 164.3
	},
	{
		name: 'Phi 3 Medium',
		image: 'phi3:14b',
		parameters: '14B',
		tags: ['text', 'small', 'performance'],
		size: 7.9,
		context: 128000,
		icon: 'microsoft.svg',
		description:
			'Phi-3 Medium is a 14B parameter language model, and outperforms Gemini 1.0 Pro. The model has underwent a post-training process that incorporates both supervised fine-tuning and direct preference optimization to ensure precise instruction adherence and robust safety measures. Our model is designed to accelerate research on language and multimodal models, for use as a building block for generative AI powered features. ',
		installed: false,

		popularity: 164.3
	},
	{
		name: 'Neural Chat',
		image: 'neural-chat:7b',
		parameters: '7B',
		tags: ['chat'],
		size: 4.1,
		description:
			'NeuralChat is a fine-tuned model released by Intel that’s based on Mistral, designed to be used for high-performance chatbot applications.',
		installed: false,

		popularity: 22.1
	},
	{
		name: 'Starling',
		image: 'starling-lm:7b',
		parameters: '7B',
		tags: ['chat', 'text'],
		size: 4.1,
		description: `Starling-7B is an open (non-commercial) large language model (LLM) trained by reinforcement learning from AI feedback. (RLAIF)

    The model harnesses the power of our new GPT-4 labeled ranking dataset, Nectar, and our new reward training and policy tuning pipeline. Starling-7B-alpha scores 8.09 in MT Bench with GPT-4 as a judge, outperforming every model to date on MT-Bench except for OpenAI’s GPT-4 and GPT-4 Turbo.`,
		installed: false,

		popularity: 17.9
	},
	{
		name: 'Code Llama',
		image: 'codellama:7b',
		tags: ['code'],
		icon: 'llama.svg',
		parameters: '7B',
		size: 3.8,
		description:
			'Code Llama is a model for generating and discussing code, built on top of Llama 2. It’s designed to make workflows faster and efficient for developers and make it easier for people to learn how to code. It can generate both code and natural language about code. Code Llama supports many of the most popular programming languages used today, including Python, C++, Java, PHP, Typescript (Javascript), C#, Bash and more.',
		installed: false,

		popularity: 338.7
	},
	{
		name: 'Code Llama',
		image: 'codellama:34b',
		tags: ['code'],
		icon: 'llama.svg',
		parameters: '34B',
		size: 20,
		description:
			'Code Llama is a model for generating and discussing code, built on top of Llama 2. It’s designed to make workflows faster and efficient for developers and make it easier for people to learn how to code. It can generate both code and natural language about code. Code Llama supports many of the most popular programming languages used today, including Python, C++, Java, PHP, Typescript (Javascript), C#, Bash and more.',
		installed: false,

		popularity: 338.7
	},
	{
		name: 'Orca Mini',
		image: 'orca-mini:3b',
		tags: ['small', 'text'],
		parameters: '3B',
		icon: 'orca.svg',
		size: 1.9,
		description:
			'Orca Mini is a Llama and Llama 2 model trained on Orca Style datasets created using the approaches defined in the paper, Orca: Progressive Learning from Complex Explanation Traces of GPT-4. There are two variations available. The original Orca Mini based on Llama in 3, 7, and 13 billion parameter sizes, and v3 based on Llama 2 in 7, 13, and 70 billion parameter sizes.',
		installed: false,

		popularity: 67.4
	},
	{
		name: 'Starcoder 2',
		image: 'starcoder2:7b',
		tags: ['code'],
		parameters: '7B',
		size: 4,
		context: 16.384,
		description:
			'StarCoder2 is the next generation of transparently trained open code LLMs. It was trained on 17 programming languages and 3.5+ trillion tokens, and is available in 3B, 7B and 13B sizes. StarCoder2 is designed to be more transparent and easier to use than previous models, with a focus on code generation and understanding.',
		installed: false,

		popularity: 28.2
	},
	{
		name: 'Starcoder 2',
		image: 'starcoder2:3b',
		tags: ['code'],
		parameters: '3B',
		size: 1.7,
		context: 16.384,
		description:
			'StarCoder2 is the next generation of transparently trained open code LLMs. It was trained on 17 programming languages and 3+ trillion tokens, and is available in 3B, 7B and 13B sizes. StarCoder2 is designed to be more transparent and easier to use than previous models, with a focus on code generation and understanding.',
		installed: false,

		popularity: 28.2
	},
	{
		name: 'Deepseek Coder',
		image: 'deepseek-coder:6.7b',
		parameters: '6.7B',
		tags: ['code'],
		size: 3.8,
		description:
			'DeepSeek Coder is trained from scratch on both 87% code and 13% natural language in English and Chinese. Each of the models are pre-trained on 2 trillion tokens.',
		installed: false,

		popularity: 100.4
	},
	{
		name: 'Deepseek Coder',
		image: 'deepseek-coder:1.3b',
		parameters: '1.3B',
		tags: ['code'],
		size: 0.776,
		description:
			'DeepSeek Coder is trained from scratch on both 87% code and 13% natural language in English and Chinese. Each of the models are pre-trained on 2 trillion tokens.',
		installed: false,

		popularity: 100.4
	},
	{
		name: 'Deepseek Coder V2',
		image: 'deepseek-coder-v2:16b',
		parameters: '16B',
		tags: ['code'],
		size: 8.9,
		description:
			'DeepSeek-Coder-V2 is an open-source Mixture-of-Experts (MoE) code language model that achieves performance comparable to GPT4-Turbo in code-specific tasks. DeepSeek-Coder-V2 is further pre-trained from DeepSeek-Coder-V2-Base with 6 trillion tokens sourced from a high-quality and multi-source corpus.',
		installed: false
	},
	{
		name: 'Deepseek Coder V2',
		image: 'deepseek-coder-v2:236b',
		parameters: '236B',
		tags: ['code'],
		size: 133,
		description:
			'DeepSeek-Coder-V2 is an open-source Mixture-of-Experts (MoE) code language model that achieves performance comparable to GPT4-Turbo in code-specific tasks. DeepSeek-Coder-V2 is further pre-trained from DeepSeek-Coder-V2-Base with 6 trillion tokens sourced from a high-quality and multi-source corpus.',
		installed: false
	},
	{
		name: 'Vicuna',
		image: 'vicuna:7b',
		parameters: '7B',
		tags: ['chat', 'text'],
		size: 3.8,
		description:
			'Vicuna is a chat assistant model. It includes 3 different variants in 3 different sizes. v1.3 is trained by fine-tuning Llama and has a context size of 2048 tokens. v1.5 is trained by fine-tuning Llama 2 and has a context size of 2048 tokens. v1.5-16k is trained by fine-tuning Llama 2 and has a context size of 16k tokens. All three variants are trained using conversations collected from ShareGPT.',
		installed: false,

		popularity: 36.3
	},
	{
		name: 'Nomic Embed Text',
		image: 'nomic-embed-text:latest',
		parameters: '137M',
		tags: ['embeddings'],
		size: 0.274,
		description:
			'A high-performing open embedding model with a large token context window: nomic-embed-text is a large context length text encoder that surpasses OpenAI text-embedding-ada-002 and text-embedding-3-small performance on short and long context tasks.',
		installed: false,
		derived: false,
		popularity: 103.4
	},
	{
		name: 'Snowflake Artic Embed Small',
		image: 'snowflake-arctic-embed:110m',
		parameters: '110M',
		tags: ['embeddings'],
		size: 0.22,
		description:
			'Snowflake Artic Embed Small is a small, high-performing text encoder model that is trained on a variety of text data and is optimized for performance on a wide range of tasks.',
		installed: false,
		derived: false,
		popularity: 6.7
	},
	{
		name: 'Snowflake Artic Embed Large',
		image: 'snowflake-arctic-embed:335m',
		parameters: '335M',
		tags: ['embeddings'],
		size: 0.67,
		description:
			'Snowflake Artic Embed Large is a large, high-performing text encoder model that is trained on a variety of text data and is optimized for performance on a wide range of tasks.',
		installed: false,
		derived: false,
		popularity: 6.8
	},
	{
		name: 'mxbai Embed Large',
		image: 'mxbai-embed-large:latest',
		parameters: '334M',
		tags: ['embeddings'],
		size: 0.67,
		description:
			'As of March 2024, this model archives SOTA performance for Bert-large sized models on the MTEB. It outperforms commercial models like OpenAIs text-embedding-3-large model and matches the performance of model 20x its size.',
		installed: false,
		derived: false,
		popularity: 34.5
	},
	{
		name: 'Codestral',
		image: 'codestral:latest',
		parameters: '22.2B',
		tags: ['code', 'tools'],
		icon: 'mistral.svg',
		size: 13,
		description:
			'Codestral is Mistral AI’s first-ever code model designed for code generation tasks.Codestral is trained on a dataset of over 80 programming languages, including Python, Java, C, C++, JavaScript, Swift, Fortran and Bash. The model can complete coding functions, write tests, and complete any partial code using a fill-in-the-middle mechanism.',
		installed: false,
		derived: false,
		popularity: 15.2
	}
];

export const models = writable([]);
export const currentModel = writable({});
