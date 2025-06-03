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
        padding: 0.5rem 0.5rem 0.5rem 1rem;
        position: fixed;
        top: 23%;
        left: 90%;
        color: white;
        background-color: var(--dark-green);
        border-radius: 0 12px 12px 0;
        z-index: 9;
    }

    @media screen and (min-width: 1020px) {
        span {
            left: 75%;
        }
    }
</style>