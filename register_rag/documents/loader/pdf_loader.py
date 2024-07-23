from .. import Document
from .loader import Loader


class PDFLoader(Loader):
    def __init__(self, file_path: str) -> None:
        super().__init__(file_path)

    async def load_file(self, file_path: str) -> Document:
        """
        Load a single PDF file from the file path.

        Args:
            file_path (str): The path to the PDF file to load.

        Returns:
            Document: The document loaded from the PDF file. The metadata of the document
            will contain the source file path(`src`).
        """
        try:
            import pypdf
        except ImportError:
            raise ImportError(
                "The PDFLoader requires the `pypdf` package to be installed. "
                "You can install it via `pip install pypdf`."
            )
        reader = pypdf.PdfReader(file_path)
        pages = reader.pages
        return Document(
            page_content="".join([page.extract_text() for page in pages]),
            metadata={"src": file_path},
        )