import { pop } from 'svelte-highlight/styles';
import { writable } from 'svelte/store';

export let initialModels = [
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
		popularity: 5800,
		fav: false,
		className: 'llama'
	},
	{
		name: 'Llama3.2',
		image: 'llama3.2:latest',
		context: 32000,
		parameters: '3B',
		icon: 'llama.svg',
		size: 2.0,
		tags: ['chat', 'text', 'reasoning'],
		description: `The Meta Llama 3.2 collection of multilingual large language models (LLMs) is a collection of pretrained and instruction-tuned generative models in 1B and 3B sizes (text in/text out). The Llama 3.2 instruction-tuned text only models are optimized for multilingual dialogue use cases, including agentic retrieval and summarization tasks. They outperform many of the available open source and closed chat models on common industry benchmarks.`,
		popularity: 3900,
		fav: true,
		className: 'llama'
	},

	{
		name: 'Llama3.2 1B',
		image: 'llama3.2:1b',
		context: 32000,
		parameters: '1B',
		icon: 'llama.svg',
		size: 1.3,
		tags: ['chat', 'text', 'reasoning'],
		description: `The Meta Llama 3.2 collection of multilingual large language models (LLMs) is a collection of pretrained and instruction-tuned generative models in 1B and 3B sizes (text in/text out). The Llama 3.2 instruction-tuned text only models are optimized for multilingual dialogue use cases, including agentic retrieval and summarization tasks. They outperform many of the available open source and closed chat models on common industry benchmarks.`,
		popularity: 3900,
		fav: false,
		className: 'llama'
	},

	{
		name: 'Mistral',
		image: 'mistral:7b',
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

		popularity: 6200,
		fav: false,
		className: 'mistral'
	},

	{
		name: 'Mistral Nemo',
		image: 'mistral-nemo:latest',
		icon: 'mistral.svg',
		parameters: '12B',
		context: 128000,
		size: 7.1,
		tags: ['chat', 'text', 'reasoning'],
		description: `Mistral NeMo is a 12B model built in collaboration with NVIDIA. Mistral NeMo offers a large context window of up to 128k tokens. Its reasoning, world knowledge, and coding accuracy are state-of-the-art in its size category. As it relies on standard architecture, Mistral NeMo is easy to use and a drop-in replacement in any system using Mistral 7B.`,
		installed: false,

		popularity: 636.4,
		fav: false,
		className: 'mistral'
	},

	{
		name: 'Mistral Small 3',
		image: 'mistral-small',
		icon: 'mistral.svg',
		parameters: '24B',
		context: 32000,
		size: 14,
		tags: ['agent', 'chat', 'text', 'reasoning'],
		description: `Mistral Small 3 is a powerful 24B parameter multilingual LLM with state-of-the-art reasoning, low-latency deployment on local hardware, and an open Apache 2.0 license, making it ideal for conversational AI, function calling, and expert fine-tuning.`,
		installed: false,
		popularity: 73.4,
		fav: false,
		className: 'mistral'
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

		popularity: 492.5,
		fav: false,
		className: 'mistral'
	},
	{
		name: 'Qwen2.5-coder',
		image: 'qwen2.5-coder',
		icon: 'qwen.svg',
		parameters: '7.62B',
		context: 128000,
		size: 7.61,
		tags: ['code', 'text', 'reasoning'],
		description: `Code capabilities reaching state of the art for open-source models. An intelligent programming assistant should be familiar with all programming languages. Qwen 2.5 Coder 32B performs excellent across more than 40 programming languages, scoring 65.9 on McEval, with impressive performances in languages like Haskell and Racket.`,
		installed: false,
		popularity: 752,
		fav: false,
		className: 'qwen'
	},
	{
		name: 'Qwen2.5-coder 3B',
		image: 'qwen2.5-coder:3b',
		icon: 'qwen.svg',
		parameters: '2.77B',
		context: 32000,
		size: 3.09,
		tags: ['code', 'text', 'reasoning'],
		description: `Code capabilities reaching state of the art for open-source models. An intelligent programming assistant should be familiar with all programming languages. Qwen 2.5 Coder 32B performs excellent across more than 40 programming languages, scoring 65.9 on McEval, with impressive performances in languages like Haskell and Racket.`,
		installed: false,
		popularity: 752,
		fav: false,
		className: 'qwen'
	},
	{
		name: 'Qwen2.5-coder 1B',
		image: 'qwen2.5-coder:1b',
		icon: 'qwen.svg',
		parameters: '1.54B',
		context: 32000,
		size: 1.31,
		tags: ['code', 'text', 'reasoning'],
		description: `Code capabilities reaching state of the art for open-source models. An intelligent programming assistant should be familiar with all programming languages. Qwen 2.5 Coder 32B performs excellent across more than 40 programming languages, scoring 65.9 on McEval, with impressive performances in languages like Haskell and Racket.`,
		installed: false,
		popularity: 752,
		fav: false,
		className: 'qwen'
	},
	{
		name: 'Qwen2.5-coder 0.5B',
		image: 'qwen2.5-coder:0.5b',
		icon: 'qwen.svg',
		parameters: '0.36B',
		context: 32000,
		size: 0.49,
		tags: ['code', 'text', 'reasoning'],
		description: `Code capabilities reaching state of the art for open-source models. An intelligent programming assistant should be familiar with all programming languages. Qwen 2.5 Coder 32B performs excellent across more than 40 programming languages, scoring 65.9 on McEval, with impressive performances in languages like Haskell and Racket.`,
		installed: false,
		popularity: 752,
		fav: false,
		className: 'qwen'
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
		popularity: 9,
		fav: false
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
		popularity: 9,
		fav: false
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

		popularity: 23.7,
		fav: false
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
		popularity: 20.3,
		fav: false
	},
	{
		name: 'Gemma 3n',
		image: 'gemma3n:latest',
		parameters: '4B',
		context: 32000,
		size: 7.5,
		icon: 'gemma.svg',
		tags: ['chat', 'text', 'reasoning'],
		description:
			'Gemma 3n models are designed for efficient execution on everyday devices such as laptops, tablets or phones. These models were trained with data in over 140 spoken languages.',
		installed: false,
		popularity: 10,
		fav: false
	},
	{
		name: 'Gemma 3 4B',
		image: 'gemma3:4b',
		parameters: '4B',
		context: 128000,
		size: 3.3,
		icon: 'gemma.svg',
		tags: ['chat', 'text', 'reasoning'],
		description:
			'The Gemma 3 models are multimodal—processing text and images—and feature a 128K context window with support for over 140 languages. ',
		installed: false,
		popularity: 2100,
		fav: false
	},
	{
		name: 'Gemma2 9B',
		image: 'gemma2:9b',
		parameters: '9B',
		context: 32000,
		size: 5.4,
		icon: 'gemma.svg',
		tags: ['chat', 'text', 'reasoning'],
		description:
			'Google’s Gemma 2 model is available in three sizes, 2B, 9B and 27B, featuring a brand new architecture designed for class leading performance and efficiency.',
		installed: false,

		popularity: 2100,
		fav: false
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

		popularity: 30.4,
		fav: false
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

		popularity: 164.3,
		fav: false
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
		popularity: 164.3,
		fav: false
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

		popularity: 338.7,
		fav: false
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

		popularity: 28.2,
		fav: false
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

		popularity: 28.2,
		fav: false
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

		popularity: 100.4,
		fav: false
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

		popularity: 100.4,
		fav: false
	},
	{
		name: 'Deepseek Coder V2',
		image: 'deepseek-coder-v2:16b',
		parameters: '16B',
		tags: ['code'],
		size: 8.9,
		description:
			'DeepSeek-Coder-V2 is an open-source Mixture-of-Experts (MoE) code language model that achieves performance comparable to GPT4-Turbo in code-specific tasks. DeepSeek-Coder-V2 is further pre-trained from DeepSeek-Coder-V2-Base with 6 trillion tokens sourced from a high-quality and multi-source corpus.',
		installed: false,

		popularity: 100.2,
		fav: false
	},
	{
		name: 'Deepseek Coder V2',
		image: 'deepseek-coder-v2:236b',
		parameters: '236B',
		tags: ['code'],
		size: 133,
		description:
			'DeepSeek-Coder-V2 is an open-source Mixture-of-Experts (MoE) code language model that achieves performance comparable to GPT4-Turbo in code-specific tasks. DeepSeek-Coder-V2 is further pre-trained from DeepSeek-Coder-V2-Base with 6 trillion tokens sourced from a high-quality and multi-source corpus.',
		installed: false,

		popularity: 100.1,
		fav: false
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

		popularity: 36.3,
		fav: false
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
		popularity: 103.4,
		fav: false
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
		popularity: 6.7,
		fav: false
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
		popularity: 6.8,
		fav: false
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
		popularity: 34.5,
		fav: false
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
		popularity: 15.2,
		fav: false
	}
];

export const models = writable([]);
export const currentModel = writable({});
