<script setup>
import { useAvatarsStore, useProfileStore, useUserStore } from '@/stores/store';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const storeProfile = useProfileStore();
const storeUser = useUserStore();
const storeAvatar = useAvatarsStore();

const router = useRouter();
const selectedFile = ref(null);
const username = ref('');
const avatarUrl = ref('');
const farmName = ref('');

console.log(storeUser.userData.user.id)

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    console.log(selectedFile.value);
    avatarUrl.value = URL.createObjectURL(file);
  }
};


const sendProfileData = async () => {
    try {
        await storeProfile.createProfileData(username, avatarUrl, farmName);
        await storeAvatar.uploadNewAvatar(selectedFile.value);
        router.push('/')
    } catch (err) {
        console.error(err)
    }
}

onMounted(async () => {
    await storeUser.initializeUserData();
});
</script>

<template>
    <div class="create-profile" v-if="storeUser.userData">
        <form @submit.prevent="sendProfileData">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="username" placeholder="Write your username"/>
            <label for="title">Avatar</label>
            <input type="file" id="avatar_url" name="avatar_url" accept="image/*" @change="handleFileChange" hidden>
            <label for="avatar_url" class="avatar-btn">Select File</label>
            <img v-if="avatarUrl" class="preview" :src="avatarUrl" />
            <label for="farm-name">Farm Name</label >
            <input type="text" id="farm_name" name="farm_name" v-model="farmName" placeholder="Write your super farm name">
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped>
    .create-profile {
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

            .avatar-btn {
                margin: 0;
                padding: 0.5rem;
                height: 3rem;
                width: 80%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: var(--main-green);
                border-radius: 12px;
            }

            img {
                margin: 1rem;
                height: 100px;
                width: 100px;
                border: 3px dashed orange;
                border-radius: 12px;
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