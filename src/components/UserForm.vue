<script setup>
import { signUp } from '@/api/supabase/piñatasAPI';
import { useUserStore } from '@/stores/store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();
const storeUser = useUserStore();

const sendUserData = async () => {
    try {
        console.log(password.value)
        const data = await signUp(email.value, password.value);

        if (data) {
            storeUser.setUserData(data);
            router.push('/create-profile');
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
        height: 100%;
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
                margin-top: 1rem;
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
    }
</style>