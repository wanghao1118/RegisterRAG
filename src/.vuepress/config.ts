import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/RegisterRagDocs/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Register RAG",
      description: "Official documentation for Register RAG",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Register RAG",
      description: "Register RAG 官方文档",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
