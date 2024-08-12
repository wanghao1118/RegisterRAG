# Register Rag

💡Quickly configure the RAG framework to meet your needs via JSON💡

## Contents

- Register Rag
  - [Contents](#contents)
  - [🔔 Updates](#-updates)
  - [🚀 Deploy](#-deploy)
    - [📦 Install](#-install)
    - [🚀 Quick Start](#-quick-start)
  - [📈 Usage](#-usage)
  - [⚙️ Configuration](#️-configuration)
  - [❓ FAQ and Troubleshooting](#-faq-and-troubleshooting)
  - [🤝 Contribution Guide](#-contribution-guide)
  - [📚 More Documentation](#-more-documentation)

## 🔔 Updates

- 2024-05-26 We released the first version of the base RAG framework that can support configurations
- 2024-06-11 We published the first [evaluation](https://github.com/Charon-ops/RegisterRAG/wiki/Evaluation-Report-(2024.06.11)) of the RAG framework.

## 🚀 Deploy

### 📦 Install

There are two ways to install the package:

1. From `pip`:

   ``` bash
   pip install register_rag
   ```

   If you want to use gpu, you should install `torch` with gpu support. More details can be found [here](https://pytorch.org/get-started/locally/).

2. From source:

   ```bash
   git clone https://github.com/Charon-ops/RegisterRAG.git
   cd RegisterRag
   pip install -r requirements.txt
   pytest tests/ # If you want to run tests through pytest
   ```

   Then, you can import the package in your code:

   ```python
    from register_rag import Pipeline
   
    pipeline = Pipeline("path/to/config.json")
   
    # More code here
   ```

### 🚀 Quick Start

There is a simple frontend for the RAG framework. You can use the following command to start the frontend:

```python
from register_rag.dashboard import Dashboard

dashboard = Dashboard()
dashboard.lanuch()
```

It is complex to configure the framework, so it is not aesthetic to configure the framework through the frontend.

A vue-based frontend is under development, and it will be released soon.

For developers, you can organize your code as follows:

```python
from register_rag import Pipeline

pipeline = Pipeline("path/to/config.json")

embedding_module = pipeline.embedding
store_module = pipeline.store
generation_module = pipeline.response_generator
prompt_module = pipeline.prompt_generator
```

As designed, the `Pipeline` class will load the configuration file and initialize the corresponding modules. You can use these modules to build your own chatbot. For more details, please refer to the [wiki page](https://github.com/Charon-ops/RegisterRAG/wiki).

## 📈 Usage

## ⚙️ Configuration

The configuration file is a JSON file that contains the following fields:

- `embedding`

- `store`

- `generation`

- `prompt`: Optional

For more details, please refer to the [configuration](https://github.com/Charon-ops/RegisterRAG/wiki).

## ❓ FAQ and Troubleshooting

## 🤝 Contribution Guide

We welcome code contributions, bug reports, and feature suggestions. You can use GitHub issues and pull requests to contribute to this project. Or you can contact us via [email](mailto:jlullm@163.com).

## 📚 More Documentation

For more detailed documentation, please refer to the [wiki](https://github.com/Charon-ops/RegisterRAG/wiki).
