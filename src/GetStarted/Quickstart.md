---
lang: en-US
title: Quick Start
description: Quick start of Register RAG
---

In this part, you will learn how to build a basic Register RAG pipeline.

Register RAG uses a json file to configure the whole pipeline. The configuration file is divided into several parts, including `embedding`, `store`, `generation` and `prompt`. There will be more parts in the future, such as `rerank`, `websearch`, etc.

## Basic Configuration

A basic configuration file is shown below, and we will build a simple RAG pipeline using this configuration file in this part.

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

## Xinference Service

If you want to try Register RAG using the above configuration file, you should start the `xinference` service first. You can refer to the [xinference documentation](https://inference.readthedocs.io/en/latest/index.html) for more information.

We will use docker as an example to start the `xinference` service. You can run the following command to start the `xinference` service:

```bash
# For Chinese users, you can use the following command to pull the image from Aliyun.
docker pull registry.cn-hangzhou.aliyuncs.com/xprobe_xinference/xinference:latest
# Or you can pull the image from Docker Hub.
docker pull xprobe/xinference:latest
```

Then, make sure that you have installed NVIDIA driver and  NVIDIA Container Toolkit. More information could be found [here](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html).

Finally, you can run the following command to start the `xinference` service:

```bash
docker run -e XINFERENCE_MODEL_SRC=modelscope -p 9997:9997 --gpus all xprobe/xinference:latest xinference-local -H 0.0.0.0 --log-level debug
```

**Note**: `--gpus` and `-H` must be set, and the CUDA version on the host machine should be `12.4` or above. If you have multiple GPUs, you can use `--gpus 0,1,2` to specify the GPUs you want to use. The image can only run on GPU available machines. If you want to run the image on a CPU machine, you can refer to the [xinference documentation](https://inference.readthedocs.io/en/latest/getting_started/using_docker_image.html) for more information.

After starting the `xinference` service, you can visit `http://localhost:9997` to check if the service is running.

## Pipeline

Then, you can create a python file to run the following code:

```python
import asyncio

from register_rag import Pipeline
from register_rag.documents import Document
from register_rag.documents.loader import PDFLoader
from register_rag.documents.splitter import CharacterSplitter

async def main():
    pipeline = Pipeline("path/to/your/configuration.json")
    loader = PDFLoader("path/to/your/pdf")
    # Split the document by '\n', you can use other splitters.
    docs = await loader.load_and_split(splitter=CharacterSplitter()) 
    collection_name = "default"
    await self.pipeline.add_docs(docs, collection_name)
    # Generate the response.
    query = "What is the capital of China?" # The query you want to ask.
    top_k = 5 # The number of related documents you want to retrieve.
    return_related_docs = True # Whether to return the related documents.
    response, related_docs = await pipeline.get_response(
        query, collection_name, top_k, return_related_docs
    )
    print(f"Response: {response}")
    print(f"Related Docs: {related_docs}")

asyncio.run(main())
```
