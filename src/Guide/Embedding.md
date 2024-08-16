---
lang: en-US
title: Embedding
description: How to use embedding in Register RAG
---

Embedding is the most critical component of the Register RAG pipeline. It transforms the input text into a vector representation, which is essential for retrieving relevant information from the database.

Register RAG offers two types of embeddings:

- `local` : This method involves loading the embedding model from the local filesystem and executing it directly on the local machine.
- `remote` : This approach entails loading the embedding model from a remote server or a Docker container.

From now on, we will introduce how to use the embedding component in Register RAG.

## Basic Configuration

Below is the configuration for the embedding in the Python code:

```python
class EmbeddingConfig(BaseModel):
    embedding_type: Literal["local", "remote"]
    embedding_model_name_or_path: Optional[str] = None
    embedding_model_device: str = "cpu"
    embedding_model_preload: bool = False
    embedding_remote_url: Optional[str] = None
    embedding_remote_token: Optional[str] = None
```

- `embedding_type`: Specifies whether the embedding is local or remote.
- `embedding_model_name_or_path`: The name or path of the embedding model. For remote types, this should be accessible from the remote server.
- `embedding_model_device`: Specifies the device (CPU or CUDA) on which the model runs. For multiple GPUs, specify the GPU ID (e.g., cuda:0). It is recommended to set CUDA_VISIBLE_DEVICES before program execution.
- `embedding_model_preload`: Determines whether to preload the model at program start. This setting is only valid for local embedding.
- `embedding_remote_url`: The URL for the remote server, applicable only to remote embedding.
- `embedding_remote_token`: An optional token for accessing the remote server, applicable only to remote embedding.

In the configuration file (JSON format), the embedding settings are defined as follows:

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

The `embedding_model_name_or_path` is divided into two parts by `/`: the class name of the embedding model and the model name. The class name locates the corresponding class in the code, and the model name is used to load the model.

## How to add a new embedding model

To integrate a new embedding model, inherit from the `EmbeddingGetter` class in `register_rag.embedding`. Alternatively, you can inherit directly from `LocalEmbeddingGetter` or `RemoteEmbeddingGetter` and implement the embedding method. If pre-processing or post-processing is needed, implement the `pre_embedding` or `post_embedding` methods. Pass any required parameters through the get_embedding method:

```python
async def get_embedding(
        self,
        docs: List[Document],
        pre_args: Dict[str, Any] = None,
        after_args: Dict[str, Any] = None,
    ) -> List[List[float]]:
```

Example of calling `get_embedding` with parameters:

```python
embedding = await embedding_getter.get_embedding(
    docs,
    pre_args={"pre_args": "value"},
    after_args={"after_args": "value"},
)
```

**Note**: The `pre_embedding` and `post_embedding` methods return `None`. The `get_embedding` method does not utilize the return values of these methods. If returning values is required, override the get_embedding method.

## Available Embedding Models

- `local`:
  - `BertEmbeddingGetter`: The config should be like `bert/model_name_or_path`.
  - `SentenceTransformerEmbeddingGetter`: The config should be like `sentence_transformer/model_name_or_path`.
- `remote`:
  - `XinferenceEmbeddingGetter`: The config should be like `xinference/model_name_or_path`.
