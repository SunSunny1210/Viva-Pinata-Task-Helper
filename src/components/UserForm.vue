<script setup>
import { useUserStore, useProfileStore } from '@/stores/store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    parentType: {
        type: String,
        required: true
    }
})

const email = ref('');
const password = ref('');
const router = useRouter();
const storeUser = useUserStore();
const storeProfile = useProfileStore();

const sendUserData = async () => {
    try {
        console.log(password.value)

        if (props.parentType === "Register") {
            const checking = await storeUser.registerUser(email.value, password.value);

            if (checking) {
                router.push('/create-profile')
            }
        }

        if (props.parentType === "Login") {
            const checking = await storeUser.loginUser(email.value, password.value);

            if (checking) {
                await storeProfile.getProfileData();
                router.push('/');
            }
        }

    } catch (err) {
        console.error(err)
    }
}
</script>

<template>
    <div class="form">
        <form @submit.prevent="sendUserData">
            <label for="email">Email</label>
            <input v-model="email" type="email" id="email" name="email" placeholder="Enter your email" />
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password" name="password" placeholder="Password must be...">
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped>
    .form {
        width: 100%;

        form {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            
            label {
                margin: 1rem;
                color: var(--dark-green);
                font-size: 1.2rem;
            }
            
            input {
                padding-left: 1rem;
                height: 3rem;
                width: 80%;
                border: 3px dotted orange;
                border-radius: 5px;
            }

            ::placeholder {
                color: darkolivegreen;
                font-size: 1rem;
            }

            button {
                margin: 1rem 0;
                height: 4rem;
                width: 80%;
                color: white;
                font-size: 1rem;
                background-color: var(--carmin);
                border: none;
                border-radius: 12px;
            }
        }
    }
</style>