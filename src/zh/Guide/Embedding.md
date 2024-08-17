---
lang: zh-CN
title: Embedding
description: 如何使用 Register RAG 的 Embedding 组件
---

Embedding 是 Register RAG 中最重要的组件之一。它将输入文本转换为向量表示，并将转换后的向量用于从数据库中检索相关信息。

Register RAG 提供了两种 Embedding 类型：

- `local` : 这种方法需要从本地文件系统加载模型，并且直接在本地机器上运行。
- `remote` : 这种方法需要从远程服务器或 Docker 容器加载模型，模型并不直接在本地机器上运行。

接下来，我们将介绍如何在 Register RAG 中使用 Embedding 组件。

## 基本配置

以下是 Python 代码中 Embedding 的配置：

```python
class EmbeddingConfig(BaseModel):
    embedding_type: Literal["local", "remote"]
    embedding_model_name_or_path: Optional[str] = None
    embedding_model_device: str = "cpu"
    embedding_model_preload: bool = False
    embedding_remote_url: Optional[str] = None
    embedding_remote_token: Optional[str] = None
```

- `embedding_type`: 指定 Embedding 是本地还是远程。
- `embedding_model_name_or_path`: Embedding 模型的名称或路径。如果 `embedding_type` 被设置为 `remote`，那么远程服务器需要具有所指定的模型名称或者路径的访问权限。
- `embedding_model_device`: 指定模型运行的设备（CPU 或 CUDA）。对于多个 GPU，可以指定 GPU ID（例如，cuda:0）。
- `embedding_model_preload`: 是否在尚未调用 `get_embedding` 方法时预加载模型。该设置仅适用于本地 Embedding。
- `embedding_remote_url`: 远程服务器的 URL，仅适用于远程 Embedding。
- `embedding_remote_token`: 访问远程服务器的可选 token，仅适用于远程 Embedding。

在配置文件（JSON 格式）中，Embedding 的设置如下：

```json
{
  "embedding": {
    "embedding_type": "remote",
    "embedding_model_name_or_path": "xinference/bge-m3",
    "embedding_remote_url": "http://localhost:9997",
    "embedding_model_preload": true
  }
}
```

`embedding_model_name_or_path` 由 `/` 分隔为两部分：Embedding 模型的类名和模型名称。类名用于在代码中定位相应的类，而模型名称用于加载模型。

## 如何添加新的 Embedding 模型

要集成新的 Embedding 模型，需要继承 `register_rag.embedding` 中的 `EmbeddingGetter` 类，或者直接继承 `LocalEmbeddingGetter` 或 `RemoteEmbeddingGetter`，并实现 `embedding` 方法。如果需要预处理或后处理，可以实现 `pre_embedding` 或 `post_embedding` 方法。通过 `get_embedding` 方法传递所需的参数：

```python
async def get_embedding(
        self,
        docs: List[Document],
        pre_args: Dict[str, Any] = None,
        after_args: Dict[str, Any] = None,
    ) -> List[List[float]]:
```

调用带有参数的 `get_embedding` 的示例：

```python
embedding = await embedding_getter.get_embedding(
    docs,
    pre_args={"pre_args": "value"},
    after_args={"after_args": "value"},
)
```

**Note**: `pre_embedding` 和 `post_embedding` 方法返回 `None`。`get_embedding` 方法不关心这些方法的返回值。如果希望使用返回值，需要重写 `get_embedding` 方法。

## 可用的 Embedding 模型

- `local`:
  - `BertEmbeddingGetter`: 配置为 `bert/model_name_or_path`.
  - `SentenceTransformerEmbeddingGetter`: 配置为 `sentence_transformer/model_name_or_path`.
- `remote`:
  - `XinferenceEmbeddingGetter`: 配置为 `xinference/model_name_or_path`.
