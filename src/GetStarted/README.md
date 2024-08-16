---
lang: en-US
title: Introduction
description: Introduction of Register RAG
---

Register RAG provides a simple and highly customizable way to build a RAG(Retrieval-Augmented Generation)
pipeline for text generation tasks.

## 🌟 Features

- Highly customizable

  You can easily customize the RAG pipeline through the configuration file using the components we provide.

  It is also easy to add your own components to the pipeline. You can just inherit the base class and implement the necessary methods. Then, you should regist your component in the factory. That's it!

- Quick to set up

  ~~A python package is provided to help you set up the RAG pipeline quickly. You can install it through pip.~~(Under development)

  ~~A docker image is provided to help you set up the RAG pipeline quickly. You can pull it from the docker hub.~~(Under development)

- Fully supports asynchronous operations

  Register RAG is designed to support asynchronous operations. You can easily run multiple components in parallel.

## 🚀 Installation

Note: **Only** `from source` is available now. More installation methods will be provided in the future.

Please refer to the [Installation Guide](./InstallationGuide.md) for detailed instructions.

## 🙏 Acknowledgements

We are deeply grateful for the work done by those who came before us, which has greatly facilitated the construction of our framework. Below is a list of the open-source projects we used, in no particular order:

- [Xinference](https://github.com/xorbitsai/inference): Streamline the operation and integration of various AI models. More details can be found [here](https://inference.readthedocs.io/en/latest/index.html).
- [Ollama](https://ollama.com/): A platform for building and deploying LLMs. More details can be found [here](https://ollama.com/).
- [VuePress](https://github.com/vuepress/core): Minimalistic Vue-powered static site generator. More details can be found [here](https://vuepress.vuejs.org/).
- [vuepress-theme-hope](https://github.com/vuepress-theme-hope/vuepress-theme-hope): A vuepress theme with tons of features. More details can be found [here](https://vuepress-theme-hope.github.io/).
- [chroma](https://github.com/chroma-core/chroma): An open-source embedding database. More details can be found [here](https://www.trychroma.com/).

## 🤝 Contribution

We welcome contributions to Register RAG! Please check out the [contribution guide](./ContributionGuide.md) for more information.

## ✉️ Contact Us

If you have any questions or suggestions, please feel free to contact us through [email](mailto:jlullm@163.com) or [GitHub Issues](https://github.com/Charon-ops/RegisterRAG/issues). We will get back to you as soon as possible.
