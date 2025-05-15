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

console.log(props.option)
</script>

<template>
    <div v-if="props.option" class="successful">
        <h2>{{ trimmedOption }} successful.</h2>
        <p v-if="props.option === 'Change Username'">Username changed correctly!</p>
        <p v-else-if="props.option === 'Change Farm Name'">Farm name changed correctly!</p>
        <p v-else-if="props.option === 'Log Out'">Log out successful!</p>
        <p v-else-if="props.option === 'Delete User'">User deletion successful!</p>
        <p v-else>Avatar updated successfully!</p>
        <button @click="handleMessage">Got it!</button>
    </div>
</template>

<style scoped>
.successful {
    position: fixed;
    top: 20vh;
    height: fit-content;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: cornsilk;
    border-radius: 12px;
    box-shadow: 0 0 5px 2000px rgba(0, 0, 0, 0.4);
    z-index: 8;
    overflow-y: scroll;

    h2 {
        margin: 0;
        padding: 1rem;
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white;
        background-color: var(--medium-green);
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