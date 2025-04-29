<script setup>
import { computed } from 'vue'

const props = defineProps({
    option: String
})

const emit = defineEmits(['close-message'])

const handleMessage = () => {
    emit('close-message')
}

const trimmedOption = computed(() => props.option.replace('Check/', ''));
</script>

<template>
    <div class="unsuccessful">
        <h2>{{ trimmedOption }} unsuccessful.</h2>
        <p v-if="props.option === 'Check/Change Email'">No valid email provided. Please, enter a valid email.</p>
        <button @click="handleMessage">Got it!</button>
    </div>
</template>

<style scoped>
.unsuccessful {
    position: fixed;
    height: fit-content;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: cornsilk;
    border-radius: 12px;
    box-shadow: 0 0 5px 2000px rgba(0, 0, 0, 0.4);
    z-index: 7;
    overflow-y: scroll;

    h2 {
        margin: 0;
        padding: 1rem;
        height: 60px;
        text-align: center;
        color: white;
        background-color: orange;
        border-radius: 12px 12px 0 0;
    }

    p {
        margin: 2rem;
        padding: 10px;
        text-align: center;
        background-color: var(--white-yellow);
        border: 3px dashed var(--carmin);
        border-radius: 5px;
    }
    
    button {
        margin-bottom: 2rem;
        height: 4rem;
        width: 80%;
        color: white;
        font-size: 1rem;
        background-color: var(--carmin);
        border: none;
        border-radius: 12px;
    }
}
</style>