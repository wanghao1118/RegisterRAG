import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  { text: "Home", link: "/" },
  {
    text: "Get started",
    link: "/GetStarted/",
    activeMatch: "^/GetStarted/",
  },
  {
    text: "Guide",
    link: "/Guide/",
    activeMatch: "^/Guide/",
  },
]);
