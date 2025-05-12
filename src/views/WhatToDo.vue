<script setup>
defineProps({
    options: Array
})

const emit = defineEmits(['add-task'])
</script>

<template>
    <div class="to-do">
        <a v-for="option in options" :key="option" @click="$emit('add-task', option)">{{ option }}</a>
    </div>
</template>

<style scoped>
    .to-do {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: var(--light-green);
        border-radius: 0 0 12px 12px;

        a {
            padding: 1rem;
            width: fit-content;
            text-decoration: none;
            color: var(--dark-green);
            background-color: var(--background-yellow);
            border-radius: 12px;
        }
    }
</style>