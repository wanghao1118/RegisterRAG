---
lang: zh-CN
title: 简介 
description: Register Rag 中生成组件的介绍
---

生成组件负责根据 prompt 生成对应的回复。当给定一个用户提出的问题时，经过召回，需要将召回结果与用户的问题结合生成 prompt,这一部分由 `PromptGenerator` 负责，并不由生成组件负责。生成组件是一个 `Generator`，根据 `PromptGenerator` 生成的 prompt 生成回复。

## 基本配置

以下是 Python 中生成组件的配置：

```python
class GenerationConfig(BaseModel):
    generation_type: Literal["local", "remote"]
    generation_model_name_or_path: Optional[str] = None
    generation_model_preload: bool = False
    generation_model_device: str = "cpu"
    generation_remote_url: Optional[str] = None
    generation_remote_token: Optional[str] = None
    generation_xinference_config: Optional[XinferenceConfig] = None
```

- `generation_type`: 生成组件的类型。可以是 `local` 或 `remote`。
- `generation_model_name_or_path`: 用于生成的模型的名称或路径。
- `generation_model_preload`: 是否在调用之前加载模型。
- `generation_model_device`: 用于生成的设备。可以是 `cpu` 或 `cuda`，也可以指定具体的 GPU 编号。
- `generation_remote_url`: 远程生成服务的 URL。仅当 `generation_type` 为 `remote` 时需要。
- `generation_remote_token`: 远程生成服务的 token。仅当 `generation_type` 为 `remote` 且服务需要 token 时需要。
- `generation_xinference_config`: Xinference 服务的配置。仅当 `generation_type` 为 `remote` 且使用 Xinference 服务时需要。

## 如何添加新的生成组件

如果需要添加自定义的生成组件，需要继承 `Generator` 类，或者继承 `LocalGenerator`、`RemoteGenerator` 类，并实现抽象方法。抽象方法如下：

- `generate`: 根据 prompt、system prompt 与历史消息生成回复。

  ```python
   async def generate(
        self,
        prompt: str,
        history: List[ResponseMessage] = None,
        system_prompt: str = None,
    ) -> str:
  ```

  `ResponseMessage` 定义如下：

  ```python
  class ResponseMessage(TypedDict):
      content: str
      role: Literal["system", "user", "assistant"]
  ```

## 可用的生成组件

- `local`:
  - `TransformersGenerator`: 使用 Transformers 库进行本地生成的生成器。`model_name_or_path` 应配置为 `transformers/xxx`。
- `remote`:
  - `OllamaGenerator`: 调用 Ollama 服务进行生成的生成器。`model_name_or_path` 应配置为 `ollama/xxx`。
  - `XinfernceGenerator`: 调用 Xinference 服务进行生成的生成器。`model_name_or_path` 应配置为 `xinference/xxx`。
