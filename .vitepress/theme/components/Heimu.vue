<template>
    <span class="heimu" :title="title || '你知道的太多了'">
        <slot></slot>
    </span>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: '你知道的太多了'
    }
});
</script>

<style scoped>
.heimu,
.heimu a,
a .heimu,
.heimu a.new {
    background-color: #252525;
    color: #252525;
    text-shadow: none;
}

.heimu:hover,
.heimu:active,
.heimu:hover .heimu,
.heimu:active .heimu {
    color: white !important;
}

.heimu:hover a,
a:hover .heimu,
.heimu:active a,
a:active .heimu {
    color: lightblue !important;
}

.heimu:hover .new,
.heimu .new:hover,
.new:hover .heimu,
.heimu:active .new,
.heimu .new:active,
.new:active .heimu {
    color: #BA0000 !important;
}
</style>