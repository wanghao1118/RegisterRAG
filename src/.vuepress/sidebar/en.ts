import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/GetStarted": [
    {
      text: "Introduction",
      link: "/GetStarted/",
    },
    {
      text: "Installation Guide",
      link: "/GetStarted/InstallationGuide",
    },
    {
      text: "Quick Start",
      link: "/GetStarted/Quickstart",
    },
    {
      text: "Contribution Guide",
      link: "/GetStarted/ContributionGuide",
    },
  ],
  "/Guide": [
    {
      text: "Guide",
      link: "/Guide/",
    },
    {
      text: "Embedding",
      link: "/Guide/Embedding",
    },
  ],
});
