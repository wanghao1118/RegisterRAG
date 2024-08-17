---
lang: zh-CN
title: Xinference 配置
description: 如何在 Register RAG 中配置 Xinference 服务
---

Xorbits Inference (Xinference) 是一个开源平台，用于简化各种 AI 模型的操作和集成。有关更多信息，请参阅 [Xinference 文档](https://inference.readthedocs.io/zh-cn/latest/)。

## 基本配置

下面是 Python 中 Xinference 服务的配置：

```python
class XinferenceConfig(BaseModel):
    xinference_model_engine: str = "Transformers"
    xinference_model_format: str = "pytorch"
    xinference_ngpu: str = "auto"
    xinference_model_size: str
    xinference_mdoel_quantization: str
```

- `xinference_model_engine`: 模型使用的引擎。
- `xinference_model_format`: 模型的格式。
- `xinference_ngpu`: 使用的 GPU 数量。
- `xinference_model_size`: 模型的大小。
- `xinference_mdoel_quantization`: 模型的量化属性。

## 示例配置

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

**Note**: 模型名称也分为两个部分，第一个部分用于确定对应的类名，第二部分用于确定加载的模型名称（或路径），两者之间通过 `/` 进行分割。
