---
lang: zh-CN
title: 快速入门
description: 如何快速使用 Register RAG
---

在这一部分，我们将介绍如何搭建一个基本的 Register RAG pipeline。

Register RAG 使用 json 文件来进行整个 pipeline 的配置。目前，配置文件有四个部分：`embedding`、`store`、`generation` 和 `prompt`。其中，`prompt` 部分可以选择不配置。预计未来最少会加入两个模块：重排序（`rerank`）和网络搜索（`websearch`）。

## 基本配置

下面是一个基本的配置文件，我们将使用这个配置文件来搭建一个简单的 RAG pipeline。

```json
{
  "embedding": {
    "embedding_type": "remote",
    "embedding_model_name_or_path": "xinference/bge-m3",
    "embedding_remote_url": "http://localhost:9997",
    "embedding_model_preload": true
  },
  "store": {
    "store_type": "local",
    "store_name": "chroma",
    "store_local_path": "/path/to/chroma"
  },
  "generation": {
    "generation_type": "remote",
    "generation_model_name_or_path": "xinference/qwen2-instruct",
    "generation_remote_url": "http://localhost:9997",
    "generation_xinference_config": {
      "xinference_model_size": "1_5",
      "xinference_mdoel_quantization": "4-bit"
    }
  }
}
```

## Xinference 服务

如果你希望使用上面的配置搭建自己的 RAG pipeline,那么需要首先启动 `xinference` 服务。你可以访问[xinference 文档](https://inference.readthedocs.io/en/latest/index.html)来获取更多信息。

在这个例子中，我们将使用 `docker` 来启动 `xinference` 服务。首先，我们需要拉取 `xinference` 镜像。

```bash
# 国内用户可以使用下面的命令从阿里云拉取镜像
docker pull registry.cn-hangzhou.aliyuncs.com/xprobe_xinference/xinference:latest
# 或者也可以从 Docker Hub 拉取镜像
docker pull xprobe/xinference:latest
```

之后，我们需要确认已经安装了 NVIDIA 驱动和  NVIDIA Container Toolkit。NVIDIA Container Toolkit的文档可以在[这里](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html)找到。

最后，我们可以使用这条命令来启动 `xinference` 服务：

```bash
docker run -e XINFERENCE_MODEL_SRC=modelscope -p 9997:9997 --gpus all xprobe/xinference:latest xinference-local -H 0.0.0.0 --log-level debug
```

**Note**: `--gpus` 和 `-H` 参数必须设置,并且主机的 CUDA 版本必须大于等于 `12.4`。如果有多个 GPU,可以使用 `--gpus 0,1,2` 来制定所需要使用的 GPU。上述镜像只能在有 GPU 的机器上运行，如果需要使用 CPU 版本，可以前往[xinference 文档](https://inference.readthedocs.io/en/latest/getting_started/using_docker_image.html)获取更多信息。

在启动 `xinference` 服务之后，可以访问 `http://localhost:9997` 来检查服务是否正常运行。

## Pipeline

可以通过下面的代码来完成一个简单的 RAG pipeline。

```python
import asyncio

from register_rag import Pipeline
from register_rag.documents import Document
from register_rag.documents.loader import PDFLoader
from register_rag.documents.splitter import CharacterSplitter

async def main():
    pipeline = Pipeline("path/to/your/configuration.json")
    loader = PDFLoader("path/to/your/pdf")
    # 使用换行符分割文档
    docs = await loader.load_and_split(splitter=CharacterSplitter()) 
    collection_name = "default"
    await self.pipeline.add_docs(docs, collection_name)
    # 生成回复
    query = "What is the capital of China?" # 问题
    top_k = 5 # 召回的文档数量
    return_related_docs = True # 是否需要返回召回结果
    response, related_docs = await pipeline.get_response(
        query, collection_name, top_k, return_related_docs
    )
    print(f"Response: {response}")
    print(f"Related Docs: {related_docs}")

asyncio.run(main())
```
