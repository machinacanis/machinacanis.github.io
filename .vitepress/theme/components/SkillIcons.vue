<template>
    <div class="skill-icons-container">
        <img v-for="id in idList" :key="id" :src="`https://skillicons.dev/icons?i=${id}`" :alt="`${id} 图标`"
            class="skill-icons" />
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    /**
     * 图标ID，多个ID用逗号分隔
     * 例如: "c,py,java" 或 "docker,mongodb,mysql"
     */
    ids: {
        type: String,
        required: true
    }
})

// 将逗号分隔的ids字符串转换为数组
const idList = computed(() => {
    return props.ids.split(',').map(id => id.trim())
})
</script>

<style scoped>
.skill-icons-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
}

.skill-icons {
    /* 你可以在这里添加单个图标的样式 */
    border: 3px solid var(--vp-c-brand-2);
    border-radius: 36px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>