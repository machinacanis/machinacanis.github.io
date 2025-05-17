import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import NewLayout from "./components/NewLayout.vue";
import Archives from "./components/Archives.vue";
import Category from "./components/Category.vue";
import Tags from "./components/Tags.vue";
import Page from "./components/Page.vue";
import Comment from "./components/CommentGiscus.vue";
import Heimu from "./components/Heimu.vue"; // 导入新组件
import { setupScrollGradient } from "./scrollGradient.js";
import { onMounted, onUnmounted } from "vue";

import "./custom.css";

export default {
  ...DefaultTheme,

  setup() {
    // 如果DefaultTheme有自己的setup，先执行它
    if (DefaultTheme.setup) {
      DefaultTheme.setup();
    }

    // 在组件挂载后设置滚动渐变效果
    let cleanup;
    onMounted(() => {
      cleanup = setupScrollGradient();
    });

    // 组件卸载时清理事件监听器
    onUnmounted(() => {
      if (cleanup) cleanup();
    });
  },

  Layout: NewLayout,
  enhanceApp({ app }) {
    // register global compoment
    app.component("Tags", Tags);
    app.component("Category", Category);
    app.component("Archives", Archives);
    app.component("Page", Page);
    app.component("Comment", Comment);
    app.component("Heimu", Heimu); // 注册为全局组件
  },
} satisfies Theme;
