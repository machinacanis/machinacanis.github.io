import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "@fontsource/maple-mono"; // Defaults to weight 400
import "@minicdn/webfonts-pingfang";
import NewLayout from "./components/NewLayout.vue";
import Archives from "./components/Archives.vue";
import Category from "./components/Category.vue";
import Tags from "./components/Tags.vue";
import Page from "./components/Page.vue";
import Comment from "./components/CommentGiscus.vue";
import Heimu from "./components/Heimu.vue";
import Marker from "./components/Marker.vue";
import Highlight from "./components/Highlight.vue";
import MarkerEvy from "./components/MarkerEvy.vue";
import LinkCard from "./components/LinkCard.vue";
import ArticleMetadata from "./components/ArticleMetadata.vue";
import { updateHomePageStyle } from "./functions.ts";
import { onMounted, onUnmounted, watch, nextTick } from "vue";

import { inBrowser } from "vitepress";
import busuanzi from "busuanzi.pure.js";

import { NProgress } from "nprogress-v2/dist/index.js"; // 进度条组件
import "nprogress-v2/dist/index.css"; // 进度条样式

import mediumZoom from "medium-zoom";
import { useRoute } from "vitepress";

import "./styles/custom.css";

export default {
  ...DefaultTheme,

  setup() {
    // 常量定义
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };

    // 如果DefaultTheme有自己的setup，先执行它
    if (DefaultTheme.setup) {
      DefaultTheme.setup();
    }

    // 在组件挂载后设置滚动渐变效果
    let cleanup;
    onMounted(() => {
      initZoom(); // 初始化图像缩放插件
    });

    // 组件卸载时清理事件监听器
    onUnmounted(() => {
      if (cleanup) cleanup();
    });

    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },

  Layout: NewLayout,

  enhanceApp({ app, router }) {
    // register global compoment
    app.component("Tags", Tags);
    app.component("Category", Category);
    app.component("Archives", Archives);
    app.component("Page", Page);
    app.component("Comment", Comment);
    app.component("Heimu", Heimu);
    app.component("Marker", Marker);
    app.component("Highlight", Highlight);
    app.component("MarkerEvy", MarkerEvy);
    app.component("LinkCard", LinkCard);
    app.component("ArticleMetadata", ArticleMetadata);

    if (inBrowser) {
      // 不蒜子配置
      router.onAfterRouteChange = () => {
        busuanzi.fetch();
      };
      // 进度条配置
      NProgress.configure({ showSpinner: false });
      router.onBeforeRouteChange = () => {
        NProgress.start(); // 开始进度条
      };
      router.onAfterRouteChange = () => {
        busuanzi.fetch();
        NProgress.done(); // 停止进度条
      };
    }

    // 彩虹背景动画样式
    if (typeof window !== "undefined") {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === "/"),
        { immediate: true }
      );
    }
  },
} satisfies Theme;
