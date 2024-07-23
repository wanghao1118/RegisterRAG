from typing import List
from .. import ResponseMessage
from .remote_generator import RemoteGenerator


class OllamaGenerator(RemoteGenerator):
    """
    Ollama generator class.

    The Ollama generator uses the Ollama library to generate responses. You should
    run `ollama serve` to start the Ollama server before using this generator. The
    `ollama` library for Python is also required. You can install it using
    `pip install ollama`.
    """

    def __init__(self, model_name: str) -> None:
        super().__init__(model_name)

    async def generate(
        self,
        prompt: str,
        history_messages: List[ResponseMessage] = None,
        system_prompt: str = None,
    ) -> str:
        try:
            import ollama
        except:
            raise ImportError(
                "The Ollama library is not installed. Please install it using `pip install ollama`."
            )

        messages = await self.message_merge(prompt, history_messages, system_prompt)

        response = ollama.chat(
            model=self.model_name,
            messages=messages,
        )

        return response["message"]["content"]