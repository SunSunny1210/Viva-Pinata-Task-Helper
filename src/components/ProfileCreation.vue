<script setup>
import { createProfile } from '@/api/supabase/piñatasAPI';
import { useUserStore } from '@/stores/store';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const storeUser = useUserStore();

const userData = storeUser.userData;
const route = useRoute();
const username = ref('');
const avatarUrl = ref('');
const farmName = ref('');


const sendProfileData = async () => {
    try {
        const data = await createProfile(userData, username, avatarUrl, farmName);

        if (data) {
            storeUser.setUserData(data);
            route.push('/')
        }
    } catch (err) {
        console.error(err)
    }
}
</script>

<template>
    <div class="create-profile">
        <form @submit.prevent="sendProfileData">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="username"/>
            <label for="avatar-url">Avatar</label>
            <input type="url" id="avatar_url" name="avatar_url" v-model="avatarUrl">
            <label for="farm-name">Farm Name</label >
            <input type="text" id="farm_name" name="farm_name" v-model="farmName">
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped>
</style>