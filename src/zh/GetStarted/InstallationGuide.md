---
lang: en-US
title: Installation Guide
description: How to install Register RAG
---

**Note**: 目前只支持从源码安装。

## 通过 pip 安装

最简单的方法是通过 `pip` 进行安装。首先，你需要安装 `pytorch`。你可以在[这里](https://pytorch.org/get-started/locally/)找到安装方法。

```bash
conda create -n register-rag python==3.10
conda activate register-rag
pip3 install torch torchvision torchaudio # Cuda 12.1
pip3 install register-rag
```

然后，你可以运行以下命令来检查安装是否成功。

```bash
python -c "import register_rag; print(register_rag.__version__)"
```

## 从源码安装

你也可以从源码安装 Register RAG。首先，你需要克隆仓库。

```bash
git clone https://github.com/Charon-ops/RegisterRAG.git"
cd RegisterRAG
```

之后，需要安装依赖。

```bash
pip install -r requirements.txt
```

最后，直接安装 Register RAG。

```bash
pip install -e .
```

你可以运行以下命令来检查安装是否成功。

```bash
python -c "import register_rag; print(register_rag.__version__)"
```

## Docker

~~我们也提供了一个 Docker 镜像，你可以通过以下命令拉取镜像。~~（开发中）
