import { defineConfig } from "vitepress";
import { getPosts } from "./theme/serverUtils";
import { fileURLToPath, URL } from "node:url";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader,
} from "vitepress-plugin-group-icons";

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
    lineNumbers: true, //false关闭
    theme: {
      light: "vitesse-light",
      dark: "vitesse-dark",
    },
    config(md) {
      md.use(groupIconMdPlugin); //代码组图标
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
    //Algolia搜索纯中文版
    search: {
      provider: "algolia",
      options: {
        appId: "UFPICZDMRI",
        apiKey: "1d0315c06a0849e9e9a95f0f1ba65aeb",
        indexName: "VitepressSite",
        locales: {
          root: {
            placeholder: "搜索文档",
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                searchBox: {
                  resetButtonTitle: "清除查询条件",
                  resetButtonAriaLabel: "清除查询条件",
                  cancelButtonText: "取消",
                  cancelButtonAriaLabel: "取消",
                },
                startScreen: {
                  recentSearchesTitle: "搜索历史",
                  noRecentSearchesText: "没有搜索历史",
                  saveRecentSearchButtonTitle: "保存至搜索历史",
                  removeRecentSearchButtonTitle: "从搜索历史中移除",
                  favoriteSearchesTitle: "收藏",
                  removeFavoriteSearchButtonTitle: "从收藏中移除",
                },
                errorScreen: {
                  titleText: "无法获取结果",
                  helpText: "你可能需要检查你的网络连接",
                },
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                  searchByText: "搜索提供者",
                },
                noResultsScreen: {
                  noResultsText: "无法找到相关结果",
                  suggestedQueryText: "你可以尝试查询",
                  reportMissingResultsText: "你认为该查询应该有结果？",
                  reportMissingResultsLinkText: "点击反馈",
                },
              },
            },
          },
        },
      },
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
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          // 自定义图标
          pip: localIconLoader(import.meta.url, "../public/python.svg"),
          pdm: localIconLoader(import.meta.url, "../public/pdm.svg"),
          poetry: localIconLoader(import.meta.url, "../public/poetry.svg"),
          uv: localIconLoader(import.meta.url, "../public/uv.svg"),
        },
      }), //代码组图标
    ],
  },
  /*
      optimizeDeps: {
          keepNames: true
      }
      */
});
