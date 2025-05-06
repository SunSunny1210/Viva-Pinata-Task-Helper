<script setup>
import { computed } from 'vue'

const props = defineProps({
    option: String,
    registerOption: String,
    loginOption: String
})

const emit = defineEmits(['close-message'])

const handleMessage = () => {
    emit('close-message')
}

const trimmedOption = computed(() => props.option.replace('Check/', ''));

console.log(props.option)
</script>

<template>
    <div v-if="props.option" class="unsuccessful">
        <h2>{{ trimmedOption }} unsuccessful.</h2>
        <p v-if="props.option === 'Check/Change Email' || props.registerOption === 'Email' || props.loginOption === 'Email'">No valid email provided. Please, enter a valid email.</p>
        <p v-else-if="props.option === 'Check/Change Password' || props.registerOption === 'Password'">No valid password provided. Please, enter a valid password. It must be at least 6 characters, and include uppercase and lowercase letters, numbers and special characters.</p>
        <p v-else-if="props.option === 'Change Username'">No valid username provided. Please, enter a valid username.</p>
        <p v-else-if="props.loginOption === 'Email Not Confirmed'">Email not confirmed. Please, check your inbox to confirm your email.</p>
        <p v-else-if="props.loginOption === 'Invalid'">Invalid credentials. Please, check that the email and password are correct.</p>
        <p v-else-if="props.option === 'Change Farm Name'">No valid farm name provided. Please, enter a valid farm name.</p>
        <p v-else-if="props.option === 'Log Out'">Error during log out. Couldn't log out successfully.</p>
        <p v-else-if="props.option === 'Delete User'">Error during deletion. Couldn't delete user successfully.</p>
        <button @click="handleMessage">Got it!</button>
    </div>
</template>

<style scoped>
.unsuccessful {
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
        padding: 1rem 0;
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>