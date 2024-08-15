---
lang: en-US
title: Installation Guide
description: How to install Register RAG
---

Note: **Only** `from source` is available now.

## From pip

A simple way to install Register RAG is to use pip, and a virtual environment is recommended. If gpu is available, you should install pytoch with gpu support. More information can be found [here](https://pytorch.org/get-started/locally/).

```bash
conda create -n register-rag python==3.10
conda activate register-rag
pip3 install torch torchvision torchaudio # For cuda12.1
pip3 install register-rag
```

Then, you can run the following command to check if the installation is successful.

```bash
python -c "import register_rag; print(register_rag.__version__)"
```

## From source

You can also install Register RAG from source. First, clone the repository.

```bash
git clone https://github.com/Charon-ops/RegisterRAG.git"
cd RegisterRAG
```

Then, install the dependencies.

```bash
pip install -r requirements.txt
```

Finally, install Register RAG.

```bash
pip install -e .
```

Then, you can run the following command to check if the installation is successful.

```bash
python -c "import register_rag; print(register_rag.__version__)"
```

## Docker

You can also use Docker to run Register RAG.
