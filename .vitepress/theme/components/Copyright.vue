<template>
    <div class="site-footer">
        🌞 祝今日愉快。<br />
        总计被访问 <span id="busuanzi_value_site_pv" /> 次 |
        GPLv3 Licensed | Copyright © 2025 <a class="vitepress" :href="website">{{ webTitle }}</a> |
        Powered by <a class="vitepress" target="_blank" href="//vitepress.vuejs.org/">VitePress</a> |
        Themed by <a class="vitepress" target="_blank"
            href="//github.com/airene/vitepress-blog-pure">vitepress-blog-pure</a> & me
    </div>
</template>
<script lang="ts" setup>
import { useData } from 'vitepress'

const { site, theme } = useData()
const website = 'https://github.com/machinacanis'
const webTitle = 'MachinaCanis'
</script>

<style>
.site-footer {
    color: #888;
    text-align: center;
    font-size: 0.75rem;
    width: 100%;
    padding: 15px 0;
    overflow: auto;
}

.vitepress {
    color: var(--vp-c-text-1);
    font-weight: 700;
}
</style>
