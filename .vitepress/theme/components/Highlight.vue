<template>
    <p>
        <span class="marker-text-highlight">
            <slot></slot>
        </span>
    </p>
</template>

<style scoped>
.marker-text-highlight {
    border-radius: 5px 5px;
    background: transparent;
    color: var(--vp-c-text-soft);
    background: linear-gradient(104deg,
            rgba(130, 255, 173, 0) 0.9%,
            rgba(130, 255, 173, 1.25) 2.4%,
            rgba(130, 255, 173, 0.5) 5.8%,
            rgba(130, 255, 173, 0.1) 93%,
            rgba(130, 255, 173, 0.7) 96%,
            rgba(130, 255, 1732, 0) 98%),
        linear-gradient(183deg,
            rgba(130, 255, 173, 0) 0%,
            rgba(130, 255, 173, 0.3) 7.9%,
            rgba(130, 255, 173, 0) 15%);
}
</style>