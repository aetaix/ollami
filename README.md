# Ollami 🖐️
> "Oh l'ami" - French for "Hi friend!"

![Ollami](https://raw.githubusercontent.com/aetaix/ollami/main/static/img/screenshot.png)

Ollami is a frontend application designed to interact with local Ollama models for text generation, reasoning, chat and more.

**Why Use Ollami?** 💡

- Save time and resources by running your favorite models directly on your machine.
- Quickly access and interact with a wide range of models, available directly in the interface.
- Seamlessly test and evaluate local model performance in a real-world application context.

## How to install Ollama 🤝

Get up and running with large language models locally: [Ollama Website](https://ollama.com).

### macOS 🍎 

[Download Ollama for macOS](https://ollama.com/download/Ollama-darwin.zip)

### Windows 🪟 (Preview)

[Download Ollama for Windows](https://ollama.com/download/OllamaSetup.exe)

### Linux 🐧 
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Install your first model (CLI) ⚡

Open your favorite terminal, and run the following commands:

```bash
ollama run llama3:latest
```
That's it! Your first model is up and running!

## Install Ollami 🔧

### With Docker 🐳

> [!NOTE] 
> This guide assumes that you have Docker Desktop installed locally. If not please [install Docker](https://docs.docker.com/get-docker/)

Clone the repository with git to your local machine development folder using the following command: 

```bash
git clone https://github.com/aetaix/ollami.git ollami
cd ollami
```

Make sure Docker Desktop is open, then run the following command:

```bash
docker compose up -d
```
Go to [localhost:5050](http://localhost:5050) to access Ollami!

### With NPM (Developpers only) 🧰

> [!NOTE] 
> This guide assumes that you have installed the latest version of Node.js and npm. If not : [Download Node.js (Node.js + npm)](https://nodejs.org/en/download/)

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

> [!TIP]
> No need to add .env variable, the app will use the default Ollama server locally started while using the `ollama run` command. By default the server is running on `http://127.0.0.1:11434`

#### Explore Available Models

Ollami have a built in library of available models that can be downloaded and run locally.

![Ollami](https://raw.githubusercontent.com/aetaix/ollami/main/static/img/Models.png)

Of course, take the time to explore the different models available and choose the one that best suits your needs.

Here are some example models that can be downloaded:

| Model              | Parameters | Size  | Download                       |
| ------------------ | ---------- | ----- | ------------------------------ |
| Llama 3            | 7B         | 3.8GB | `ollama run llama3`            |
| Mistral            | 7B         | 4.1GB | `ollama run mistral`           |
| Phi-3              | 3.8B       | 2.3GB | `ollama run phi3`               |
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

> [!TIP]  
> You should have at least 8 GB of RAM available to run the 7B models, 16 GB to run the 13B models, and 32 GB to run the 33B models.
