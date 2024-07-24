from abc import abstractmethod
import asyncio
from typing import List

from ...config import Config
from ..response_message import ResponseMessage

from .. import Generator


class LocalGenerator(Generator):
    """
    Local generator base class.

    The model_path is required for the local generator. If pre_load is set to True,
    the model will be loaded when the generator is created. Otherwise, the model will
    be loaded when the generate method is called for the first time.
    """

    def __init__(self, config: Config) -> None:
        super().__init__(config)
        if self.config.generation.generation_model_name_or_path is None:
            raise ValueError("Model name or path is required.")
        self.model_path = self.config.generation.generation_model_name_or_path
        self.pre_load = self.config.generation.generation_model_preload
        self.device = self.config.generation.generation_model_device
        self.load_task: asyncio.Task = None
        self.model = None
        if self.pre_load:
            self.load_task = asyncio.create_task(self.load())

    async def generate(
        self,
        prompt: str,
        history_messages: List[ResponseMessage] = None,
        system_prompt: str = None,
    ) -> str:
        if self.load_task is None:
            self.load_task = asyncio.create_task(self.load())
        await self.load_task
        return ""

    @abstractmethod
    async def load(self) -> None:
        """
        Load the model.

        Raises:
            NotImplementedError: This method should be implemented by the subclass.
        """
        raise NotImplementedError(
            "The load method must be implemented by the subclass."
        )
