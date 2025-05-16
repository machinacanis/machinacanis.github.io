// 处理标题渐变色跟随滚动和自动变化

// 使用localStorage存储当前渐变色状态
const GRADIENT_STORAGE_KEY = "vp-gradient-state";

// 基于时间的渐变状态，确保每次访问网站时有初始渐变效果
const getTimeBasedHue = () => {
  // 使用当天的小时和分钟创建一个确定的初始色调
  const now = new Date();
  const timeValue = (now.getHours() * 60 + now.getMinutes()) % 360;
  return timeValue;
};

export function setupScrollGradient() {
  // 如果不在浏览器环境中，直接返回
  if (typeof window === "undefined") return;

  // 获取文档的总高度
  const getDocHeight = () => {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  };

  // 计算滚动百分比
  const getScrollPercent = () => {
    const docHeight = getDocHeight();
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    // 避免除以零或负值
    if (docHeight <= windowHeight) return 0;
    return Math.min(Math.max(scrollTop / (docHeight - windowHeight), 0), 1);
  };

  // HSL颜色转换为十六进制
  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;

    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };

    return `#${f(0)}${f(8)}${f(4)}`;
  };

  // 从localStorage获取保存的渐变状态或使用基于时间的初始值
  let currentHue = getTimeBasedHue();
  try {
    const savedState = localStorage.getItem(GRADIENT_STORAGE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // 如果存储的状态太旧(超过30分钟)，使用新的初始值
      if (Date.now() - parsedState.timestamp < 30 * 60 * 1000) {
        currentHue = parsedState.hue;
      }
    }
  } catch (e) {
    console.error("Failed to restore gradient state:", e);
  }

  // 跟踪上次滚动变化时间
  let lastScrollTime = Date.now();
  let autoAnimationSpeed = 0.2; // 自动变化的速度(每帧色相变化量)
  let userInteracting = false; // 标记用户是否正在交互
  let interactionTimeout;

  // 更新渐变颜色
  const updateGradientColors = (scrollTriggered = false) => {
    // 如果是由滚动触发，记录交互状态和时间
    if (scrollTriggered) {
      lastScrollTime = Date.now();
      userInteracting = true;

      // 清除之前的交互超时
      if (interactionTimeout) {
        clearTimeout(interactionTimeout);
      }

      // 2秒无交互后恢复自动动画
      interactionTimeout = setTimeout(() => {
        userInteracting = false;
      }, 2000);

      const scrollPercent = getScrollPercent();
      // 滚动时色相变化更快
      currentHue = (currentHue + scrollPercent * 5) % 360;
    } else if (!userInteracting) {
      // 自动动画模式 - 缓慢变化色相
      currentHue = (currentHue + autoAnimationSpeed) % 360;
    }

    // 创建三种不同但协调的颜色
    const color1 = hslToHex(currentHue, 80, 60);
    const color2 = hslToHex((currentHue + 15) % 360, 75, 55);
    const color3 = hslToHex((currentHue + 30) % 360, 70, 50);

    // 更新CSS变量
    document.documentElement.style.setProperty("--dynamic-gradient-1", color1);
    document.documentElement.style.setProperty("--dynamic-gradient-2", color2);
    document.documentElement.style.setProperty("--dynamic-gradient-3", color3);

    // 保存当前状态到localStorage，便于页面间共享
    try {
      localStorage.setItem(
        GRADIENT_STORAGE_KEY,
        JSON.stringify({
          hue: currentHue,
          timestamp: Date.now(),
        })
      );
    } catch (e) {
      console.error("Failed to save gradient state:", e);
    }
  };

  // 添加页面可见性变化监听器，确保页面切换后颜色立即更新
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      updateGradientColors();
    }
  });

  // 添加滚动事件监听器
  let scrollTimeout;
  const handleScroll = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => updateGradientColors(true), 10);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // VitePress路由变化后也要更新颜色
  // 通过MutationObserver监控DOM变化来检测路由切换
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList" || mutation.type === "attributes") {
        // 检测到DOM变化，可能是路由切换
        updateGradientColors();
        break;
      }
    }
  });

  // 监视文档体的变化
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });

  // 设置自动动画循环
  let animationFrameId;
  const animateGradient = () => {
    updateGradientColors();
    animationFrameId = requestAnimationFrame(animateGradient);
  };

  // 启动自动动画
  animationFrameId = requestAnimationFrame(animateGradient);

  // 立即初始化颜色，确保页面加载时就有渐变效果
  updateGradientColors();

  // 清理函数
  return () => {
    window.removeEventListener("scroll", handleScroll);
    document.removeEventListener("visibilitychange", updateGradientColors);
    observer.disconnect();
    if (scrollTimeout) clearTimeout(scrollTimeout);
    if (interactionTimeout) clearTimeout(interactionTimeout);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  };
}
