# Ollami 🌟

This package is a frontend application designed specifically to utilize local Ollama Models for text generation. Feel free to experiment with any number of models from the extensive Ollama library!

**Why Use Ollami?** 💡

- Seamlessly test and evaluate local model performance in a real-world application context.
- Save time and resources by running your favorite models directly on your machine.

## Prerequisites 🏗️

You have installed the latest version of Node.js and npm. If not :

- [Download Node.js (Node.js + npm)](https://nodejs.org/en/download/)

> Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript applications on your local machine, and much more.


## Install Ollama 🤝

Get up and running with large language models locally.

_[Find detailed instructions on installing Ollama here](https://ollama.com)_

### macOS 🍎 

[Download Ollama for macOS](https://ollama.com/download/Ollama-darwin.zip)

### Windows 🪟 (Preview)

[Download Ollama for Windows](https://ollama.com/download/OllamaSetup.exe)

### Linux 🐧 
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Install your first model ⚡

Interact with models like Mistral effortlessly:

```bash
ollama run mistral
```

## Install Ollami 🔧

Clone the repository to your local machine development folder using the following command: 

```bash
git clone https://github.com/aetaix/ollami.git ollami
cd ollami
```

Install packages and start the app:

```bash
npm install
```

Launch the app:

```bash
npm run dev
```

> Note : No need to add .env variable, the app will use the default Ollama server locally started while using the `ollama run` command. By default the server is running on `http://127.0.0.1:11434`

#### Explore Available Models

Discover an extensive array of models at [ollama.com/library](https://ollama.com/library "ollama model library")

Here are some example models that can be downloaded:

| Model              | Parameters | Size  | Download                       |
| ------------------ | ---------- | ----- | ------------------------------ |
| Llama 2            | 7B         | 3.8GB | `ollama run llama2`            |
| Mistral            | 7B         | 4.1GB | `ollama run mistral`           |
| Dolphin Phi        | 2.7B       | 1.6GB | `ollama run dolphin-phi`       |
| Phi-2              | 2.7B       | 1.7GB | `ollama run phi`               |
| Neural Chat        | 7B         | 4.1GB | `ollama run neural-chat`       |
| Starling           | 7B         | 4.1GB | `ollama run starling-lm`       |
| Code Llama         | 7B         | 3.8GB | `ollama run codellama`         |
| Llama 2 Uncensored | 7B         | 3.8GB | `ollama run llama2-uncensored` |
| Llama 2 13B        | 13B        | 7.3GB | `ollama run llama2:13b`        |
| Llama 2 70B        | 70B        | 39GB  | `ollama run llama2:70b`        |
| Orca Mini          | 3B         | 1.9GB | `ollama run orca-mini`         |
| Vicuna             | 7B         | 3.8GB | `ollama run vicuna`            |
| LLaVA              | 7B         | 4.5GB | `ollama run llava`             |
| Gemma              | 2B         | 1.4GB | `ollama run gemma:2b`          |
| Gemma              | 7B         | 4.8GB | `ollama run gemma:7b`          |

> Note: You should have at least 8 GB of RAM available to run the 7B models, 16 GB to run the 13B models, and 32 GB to run the 33B models.