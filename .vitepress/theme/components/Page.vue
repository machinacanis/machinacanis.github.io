<template>
    <div class="tip custom-block">
        <p class="custom-block-title">你好！</p>
        <p>这是<a href="/pages/about">我</a>的个人博客&知识库，因为性质上略微有点私人，可能有些内容会有点碎片化，敬请谅解！</p>
        <p>你可以直接使用
            <span class="search-link" @click="openSearch"
                style="cursor:pointer; color:var(--vp-c-brand); text-decoration:underline;">搜索栏</span>
            来查找你想要的内容。
        </p>
    </div>

    <div v-for="(article, index) in posts" :key="index" class="post-list">
        <div class="post-header">
            <div class="post-title">
                {{ article.frontMatter.order > 0 ? '📌' : '' }}
                <a :href="withBase(article.regularPath)"> {{ article.frontMatter.title }}</a>
            </div>
        </div>
        <p class="describe" v-html="article.frontMatter.description"></p>
        <div class='post-info'>
            {{ article.frontMatter.date }} <span v-for="item in article.frontMatter.tags"><a
                    :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a></span>
        </div>
    </div>

    <div class="pagination" v-if="pagesNum > 1">
        <span v-for="(item, index) in pageArray" :key="index" :class="['link', { active: item === pageCurrent }]">
            <template v-if="item === '...'"> ... </template>
            <template v-else-if="item === pageCurrent">
                {{ item }}
            </template>
            <template v-else>
                <a :href="withBase(item === 1 ? '/index.html' : `/page_${item}.html`)">
                    {{ item }}
                </a>
            </template>
        </span>
    </div>
</template>

<script lang="ts" setup>

import { useData, withBase } from 'vitepress'
import { PropType, computed, onMounted, ref } from 'vue'
import { generatePaginationArray } from '../pagination'
interface Article {
    regularPath: string
    frontMatter: {
        order: number
        title: string
        description: string
        date: string
        tags: string[]
    }
}
const props = defineProps({
    posts: {
        type: Array as PropType<Article[]>,
        required: true
    },
    pageCurrent: {
        type: Number as PropType<number>,
        required: true
    },
    pagesNum: {
        type: Number as PropType<number>,
        required: true
    }
})

const { theme } = useData()

const pageArray = computed(() => {
    return generatePaginationArray(props.pagesNum, props.pageCurrent)
})

function openSearch() {
    // 查找具有 DocSearch-Button 和 aria-label="Search" 的按钮并触发点击
    const btn = document.querySelector('.DocSearch-Button[aria-label="Search"]') as HTMLElement
    if (btn) btn.click()
}
</script>

<style scoped>
.post-list {
    border-bottom: 1px dashed var(--vp-c-divider);
    padding: 14px 0 14px 0;
}
.post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post-title {
    font-size: 1.0625rem;
    font-weight: 500;
    color: var(--bt-theme-title)!important;
    margin: 0.1rem 0;
}
.post-title a{
    color: var(--bt-theme-title)!important;
}

.describe {
    font-size: 0.9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: var(--vp-c-text-2);
    margin: 10px 0;
    line-height: 1.5rem;
}
.pagination {
    margin-top: 16px;
    display: flex;
    justify-content: center;
}
.link {
    display: inline-block;
    width: 26px;
    text-align: center;
    border: 1px var(--vp-c-divider) solid;
    border-right: none;
    font-weight: 400;
    border-radius: 20px;
}
.link.active {
    background: var(--vp-c-text-1);
    color: var(--vp-c-neutral-inverse);
    border: 1px solid var(--vp-c-text-1) !important;
}

@media screen and (max-width: 768px) {
    .post-list {
        padding: 14px 0 14px 0;
    }
    .post-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .post-title {
        font-size: 1.0625rem;
        font-weight: 400;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        width: 17rem;
    }
    .describe {
        font-size: 0.9375rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        margin: 0.5rem 0 1rem;
    }
}

.search-link {
    cursor: pointer;
    color: var(--vp-c-brand);
    text-decoration: underline;
}
</style>

