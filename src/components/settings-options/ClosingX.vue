<script setup>
    const props = defineProps({
        close: Function
    })
</script>

<template>
    <span @click="props.close">X</span>
</template>

<style scoped>
    span {
        padding: 0.5rem;
        position: fixed;
        top: 10.5rem;
        right: 10px;
        color: white;
        background-color: var(--dark-green);
        border-radius: 0 12px 12px 0;
        z-index: 10;
    }
</style>