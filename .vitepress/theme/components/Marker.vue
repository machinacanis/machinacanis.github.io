<template>
    <p>
        <span class="marker-text">
            <slot></slot>
        </span>
    </p>
</template>

<style scoped>
.marker-text {
    text-decoration: underline;
    text-decoration-thickness: 9px;
    text-decoration-color: rgba(255, 228, 0, 0.4);
    text-underline-offset: -4px;
    text-decoration-skip-ink: none;
}
</style>