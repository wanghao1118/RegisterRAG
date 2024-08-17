---
lang: en-US
title: Store
description: How to use the Store component in Register RAG
---

Store is designed to store documents and embeddings in a database. When the query embedding is generated, it is compared with the embeddings stored in the database to retrieve the most similar document(s).

A Store component is complex and contains multiple abstract methods. As the same as the Embedding component, it is divided into two categories:

- `local`: Store the embeddings and documents directly in local disk.
- `remote`: Store the embeddings and documents in a remote database or a Docker container.

## Basic Configuration

Below is the configuration for the Store component in Python:

```python
class StoreConfig(BaseModel):
    store_type: Literal["local", "remote"]
    store_name: Optional[str] = None
    store_remote_url: Optional[str] = None
    store_remote_token: Optional[str] = None
    store_local_path: Optional[str] = None
```

- `store_type`: The type of the Store component. It can be either `local` or `remote`.
- `store_name`: The name of the Store component.
- `store_remote_url`: The URL of the remote database. It is only required when `store_type` is `remote`.
- `store_remote_token`: The token of the remote database. It is only required when `store_type` is `remote` and the database requires a token.
- `store_local_path`: The path to the local directory where the embeddings and documents are stored. It is only required when `store_type` is `local`.

In the configuration file(JSON format), the Store settings are defined as follows:

```json
{
  "store": {
    "store_type": "local",
    "store_name": "chroma",
    "store_local_path": "/path/to/data"
  }
}
```

## How to add a new Store component

To integrate a new Store component, you need to create a new class that inherits from the `Store` class and implements the abstract methods. The abstract methods are as follows:

- `add_document`: Add a single document and its embedding to the database.

  ```python
   async def add_document(
        self,
        document: Document,
        embedding: List[float],
        collection_name: str,
        id: str = None,
    ) -> None:
  ```

  The `add_documents` method calls the `add_document` method in a loop by default. You can override this method to improve the performance.

- `search_by_embedding`: Retrieve the most similar document(s) based on the query embedding.

  ```python
  async def search_by_embedding(
      self, 
      embedding: List[float], 
      collection_name: str, 
      top_k: int = 5
  ) -> List[Document]:
  ```

  `search_by_embeddings` method is not provided by default. If you need to search for multiple embeddings at once, you can add this method.

- `get_id_by_document`: Retrieve the ID of a document based on the document content.

  ```python
  async def get_id_by_document(
      self, 
      document: Document, 
      collection_name: str
  ) -> str:
  ```

  `get_ids_by_documents` method calls the `get_id_by_document` method in a loop by default. You can override this method to improve the performance.

- `delete_by_id`: Delete a document and its embedding from the database based on the document ID.

  ```python
  async def delete_by_id(
      self, 
      id: str, 
      collection_name: str
  ) -> None:
  ```

  `delete_by_ids` method calls the `delete_by_id` method in a loop by default. You can override this method to improve the performance.

After implementing the abstract methods, you need to register the new Store component in the `StoreFactory` class. The `StoreFactory` class is responsible for creating the Store component based on the configuration.

## Available Store components

- `local`
  - `ChromaStore` : The name should be set to `chroma` in the configuration file.
