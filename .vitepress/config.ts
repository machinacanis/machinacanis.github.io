import { defineConfig } from "vitepress";
import { getPosts } from "./theme/serverUtils";
import { markdownHeimuPlugin } from "./plugins/markdown-heimu";

//每页的文章数量
const pageSize = 10;

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  markdown: {
    container: {
      tipLabel: "🤔 小提示",
      warningLabel: "🤯 警告",
      dangerLabel: "☠️ 很危险！",
      infoLabel: "⭐ 一些你应该知道的...",
      detailsLabel: "详情...",
    },
  },

  title: "Kikaiken",
  base: "/",
  cacheDir: "./node_modules/vitepress_cache",
  description: "vitepress,blog,blog-theme",
  ignoreDeadLinks: true,
  themeConfig: {
    posts: await getPosts(pageSize),
    website: "https://github.com/machinacanis/machinacanis.github.io", //copyright link
    // 评论的仓库地址 https://giscus.app/ 请按照这个官方初始化后覆盖
    comment: {
      repo: "machinacanis/machinacanis.github.io",
      repoId: "R_kgDOOrEDTg",
      categoryId: "DIC_kwDOOrEDTs4CqOBd",
    },
    nav: [
      { text: "🧊Cryo", link: "https://machinacanis.github.io/cryo/" },
      { text: "主页", link: "/" },
      { text: "分类", link: "/pages/category" },
      { text: "归档", link: "/pages/archives" },
      { text: "标签", link: "/pages/tags" },
      { text: "关于", link: "/pages/about" },
      // { text: 'Airene', link: 'http://airene.net' }  -- External link test
    ],
    search: {
      provider: "local",
    },
    //outline:[2,3],
    outline: {
      label: "文章摘要",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/machinacanis" }],
  } as any,

  srcExclude: isProd
    ? [
        "**/trash/**/*.md", // 排除所有 trash 目录
        "**/draft/**/*.md", // 递归排除子目录
        "**/private-notes/*.md", // 排除特定文件
        "README.md",
      ]
    : ["README.md"],
  vite: {
    //build: { minify: false }
    server: { port: 5000 },
  },
  /*
      optimizeDeps: {
          keepNames: true
      }
      */
});
