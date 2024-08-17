---
lang: zh-CN
title: 存储
description: 如何在 Register RAG 中使用存储组件
---

存储组件用于将文档及与其相应的 embedding 存储在数据库中。当用户提出问题时，系统会将问题的 embedding 与数据库中存储的 embedding 进行比较，以检索出最相似的文档。

存储组件是一个复杂的组件，包含多个抽象方法。与嵌入组件一样，存储组件也分为两类：

- `local`: Store the embeddings and documents directly in local disk.
- `remote`: Store the embeddings and documents in a remote database or a Docker container.

## 基本配置

以下是 Python 中存储组件的配置：

```python
class StoreConfig(BaseModel):
    store_type: Literal["local", "remote"]
    store_name: Optional[str] = None
    store_remote_url: Optional[str] = None
    store_remote_token: Optional[str] = None
    store_local_path: Optional[str] = None
```

- `store_type`: 存储组件的类型。可以是 `local` 或 `remote`。
- `store_name`: 存储组件的名称。用于区分不同的存储组件。
- `store_remote_url`: 远程数据库的 URL。仅当 `store_type` 为 `remote` 时需要。
- `store_remote_token`: 远程数据库的 token。仅当 `store_type` 为 `remote`，且数据库需要 token 时需要。
- `store_local_path`: 存储嵌入和文档的本地目录路径。仅当 `store_type` 为 `local` 时需要。

在配置文件中（JSON 格式），存储设置如下所示：

```json
{
  "store": {
    "store_type": "local",
    "store_name": "chroma",
    "store_local_path": "/path/to/data"
  }
}
```

## 如何添加新的存储组件

要集成新的存储组件，需要创建一个新的类，该类继承自 `Store` 类并实现抽象方法。抽象方法如下：

- `add_document`: 将单个文档及其 embedding 添加到数据库中。

  ```python
   async def add_document(
        self,
        document: Document,
        embedding: List[float],
        collection_name: str,
        id: str = None,
    ) -> None:

  ```python
   async def add_document(
        self,
        document: Document,
        embedding: List[float],
        collection_name: str,
        id: str = None,
    ) -> None:
  ```

  `add_documents` 方法默认调用 `add_document` 方法。如果有更高效的实现方式，可以重写该方法。

- `search_by_embedding`: 根据给定 embedding 检索最相似的文档。

  ```python
  async def search_by_embedding(
      self, 
      embedding: List[float], 
      collection_name: str, 
      top_k: int = 5
  ) -> List[Document]:
  ```

  `search_by_embeddings` 方法默认不提供。如果需要一次搜索多个 embedding，可以添加该方法。

- `get_id_by_document`: 根据文档内容检索文档的 ID。

  ```python
  async def get_id_by_document(
      self, 
      document: Document, 
      collection_name: str
  ) -> str:
  ```

  `get_ids_by_documents` 方法默认调用 `get_id_by_document` 方法。如果有更高效的实现方式，可以重写该方法。

- `delete_by_id`: 根据文档 ID 从数据库中删除文档及其 embedding。

  ```python
  async def delete_by_id(
      self, 
      id: str, 
      collection_name: str
  ) -> None:
  ```

  `delete_by_ids` 方法默认调用 `delete_by_id` 方法。如果有更高效的实现方式，可以重写该方法。

实现完抽象方法后，需要在 `StoreFactory` 类中注册新的存储组件。`StoreFactory` 类负责根据配置创建存储组件。

## 可用的存储组件

- `local`
  - `ChromaStore` : 配置文件中的名称应设置为 `chroma`。
