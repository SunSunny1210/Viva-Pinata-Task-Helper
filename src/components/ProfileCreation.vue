<script setup>
import { createProfile } from '@/api/supabase/piñatasAPI';
import { useProfileStore, useUserStore } from '@/stores/store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const storeProfile = useProfileStore();
const storeUser = useUserStore();

const router = useRouter();
const username = ref('');
const avatarUrl = ref('');
const farmName = ref('');

console.log(storeUser.userData.user.id)


const sendProfileData = async () => {
    try {
        const userId = { id: storeUser.userData.user.id };
        const data = await createProfile(userId, username, avatarUrl, farmName);
        
        if (data) {
            storeProfile.setProfileData(data);
            router.push('/')
        }
    } catch (err) {
        console.error(err)
    }
}
</script>

<template>
    <div class="create-profile" v-if="storeUser.userData">
        <form @submit.prevent="sendProfileData">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="username" placeholder="Write your username"/>
            <label for="avatar-url">Avatar</label>
            <input type="url" id="avatar_url" name="avatar_url" v-model="avatarUrl" placeholder="Paste here your avatar URL">
            <label for="farm-name">Farm Name</label >
            <input type="text" id="farm_name" name="farm_name" v-model="farmName" placeholder="Write your super farm name">
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped>
    .create-profile {
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