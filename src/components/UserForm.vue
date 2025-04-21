<script setup>
import { signUp } from '@/api/supabase/piñatasAPI';
import { useUserStore } from '@/stores/store';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRoute();
const storeUser = useUserStore();

const sendUserData = async () => {
    try {
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
            <input type="email" id="email" name="email" />
            <label for="password">Password</label>
            <input type="password" id="password" name="password">
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped>
</style>