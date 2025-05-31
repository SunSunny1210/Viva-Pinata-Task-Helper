<script setup>
import { computed } from 'vue';

const props = defineProps({
    options: Object,
})

console.log(props.options)

const filteredOptions = computed(() =>
  Object.entries(props.options).filter(([key]) => key !== 'TITLE')
);
</script>

<template>
    <div class="setting">
        <h2>{{ options.TITLE }}</h2>
        <div class="options">
            <span v-for="([key, value]) in filteredOptions" :key="key"  class="clickable" @click="$emit('trigger-function', value)">{{ value }}</span>
        </div>
    </div>
</template>

<style scoped>
    .setting {
        padding: 1rem;
        position: relative;
        height: fit-content;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        h2 {
            position: relative;
            top: 20px;
            margin: 0 2rem;
            padding: 0.5rem;
            width: fit-content;
            color: white;
            background-color: var(--main-green);
            border-radius: 12px;
            z-index: 2;
        }

        .options {
            padding: 2rem 1rem 1rem 1rem;
            height: 100%;
            width: 100%;
            top: 2.5rem;
            left: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 10px;
            text-align: start;
            font-size: 1.2rem;
            color: var(--dark-green);
            background-color: white;
            border: 3px dashed var(--light-green);
            border-radius: 12px;
        }
        
        span {
            padding: 10px;
            background-color: var(--white-yellow);
            border: 3px dashed var(--carmin);
            border-radius: 5px;
        }

        span:hover,
        span:active {
            background-color: darkgreen;
            color: white;
        }
    }

    @media screen and (min-width: 1020px) {
        
    }
</style>