from abc import abstractmethod
from typing import List

from register_rag.response_generators.response_message import ResponseMessage

from .. import Generator


class RemoteGenerator(Generator):
    def __init__(self, model_name: str) -> None:
        super().__init__()
        self.model_name = model_name

    async def generate(
        self, prompt: str, history_messages: List[ResponseMessage] = None
    ) -> str:
        raise NotImplementedError(
            "The generate method must be implemented by the subclass."
        )
