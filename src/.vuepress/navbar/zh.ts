import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  {
    text: "主页",
    link: "/zh/",
  },
  {
    text: "快速开始",
    link: "/zh/GetStarted/",
    activeMatch: "^/zh/GetStarted/",
  },
  {
    text: "指南",
    link: "/zh/Guide/",
    activeMatch: "^/zh/Guide/",
  },
]);
