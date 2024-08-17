import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/GetStarted": [
    {
      text: "简介",
      link: "/zh/GetStarted/",
    },
    {
      text: "安装指南",
      link: "/zh/GetStarted/InstallationGuide",
    },
    {
      text: "快速入门",
      link: "/zh/GetStarted/Quickstart",
    },
    {
      text: "贡献指南",
      link: "/zh/GetStarted/ContributionGuide",
    },
  ],
  "/zh/Guide": [
    {
      text: "指南",
      link: "/zh/Guide/",
    },
    {
      text: "Embedding",
      link: "/zh/Guide/Embedding",
    },
    {
      text: "存储",
      link: "/zh/Guide/Store",
    },
    {
      text: "生成",
      link: "/zh/Guide/Generation/",
      collapsible: true,
      children: [
        { text: "简介", link: "/zh/Guide/Generation/" },
        { text: "Xinference配置", link: "/zh/Guide/Generation/Xinference" },
      ],
    },
  ],
});
