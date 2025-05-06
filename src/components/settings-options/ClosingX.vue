<script setup>
    const props = defineProps({
        close: Function,
        successful: Boolean,
        unsuccessful: Boolean
    })
</script>

<template>
    <span v-if="!props.successful && !props.unsuccessful" @click="props.close">X</span>
</template>

<style scoped>
    span {
        padding: 0.5rem;
        position: fixed;
        top: 10.5rem;
        right: 11px;
        color: white;
        background-color: var(--dark-green);
        border-radius: 0 12px 12px 0;
        z-index: 10;
    }
</style>