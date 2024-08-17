---
lang: en-US
title: Xinference
description: How to configure the Xinference service in Register RAG
---

Xorbits Inference (Xinference) is an open-source platform to streamline the operation and integration of a wide array of AI models. For more information, see the [Xinference Documentation](https://inference.readthedocs.io/en/latest/).

## Basic Configuration

Below is the configuration for the Xinference service in Python:

```python
class XinferenceConfig(BaseModel):
    xinference_model_engine: str = "Transformers"
    xinference_model_format: str = "pytorch"
    xinference_ngpu: str = "auto"
    xinference_model_size: str
    xinference_mdoel_quantization: str
```

- `xinference_model_engine`: The engine used for the model.
- `xinference_model_format`: The format of the model.
- `xinference_ngpu`: The number of GPUs used for the model.
- `xinference_model_size`: The size of the model.
- `xinference_mdoel_quantization`: The quantization of the model.

## Example Configuration

```json
{
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

**Note**: The model name is set to `xinference/qwen2-instruct`. The `xinferece` prefix is used to indicate that the model is hosted on the Xinference service, and `qwen2-instruct` is the name of the model. A `/` is used to separate the service name and the model name.
