<script setup>
import { useAvatarsStore, useProfileStore, useUserStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const emit = defineEmits(['open-successful', 'open-unsuccessful']);

const storeUser = useUserStore();
const storeProfile = useProfileStore();
const storeAvatar = useAvatarsStore();

const { avatars } = storeToRefs(storeAvatar);

const newAvatarURL = ref('');
const selectedFile = ref(null);
const selectedAvatar = ref(null);

const selectAvatar = async (avatar) => {
     const confirmed = confirm(`Do you want to set ${avatar.url} as your avatar?`);
     if (!confirmed) return;

     try {
         selectedAvatar.value = avatar;
         await storeProfile.updateProfileAvatar(avatar.url);
         emit('open-successful');
         console.log('Avatar updated via selection!');
     } catch (err) {
         console.error('Error selecting avatar:', err);
         emit('open-unsuccessful');
     }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    newAvatarURL.value = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
    try {
        if (!selectedFile.value) {
            console.error("No file selected");
            return
        }
        
        await storeProfile.updateProfileAvatar(selectedFile.value);
        await storeAvatar.fetchAvatars();

        emit('open-successful')
    } catch (err) {
        console.error(err)
        emit('open-unsuccessful')
    }
}


onMounted(async () => {
    await storeAvatar.fetchAvatars();
})
</script>

<template>
    <div class="pop-up">
        <h2>Change Avatar</h2>
        <div class="all-options">
            <div class="change-avatar">
                <h3>Upload your avatar</h3>
                <form @submit.prevent="handleSubmit">
                    <p>Select an image to set as your avatar.</p>
                    <input type="file" id="upload" name="avatar_upload" accept="image/*" @change="handleFileChange" hidden/>
                    <label for="upload" class="upload-btn">Select your file</label>
                    <img v-if="newAvatarURL" class="preview" :src="newAvatarURL" />
                    <button type="submit">Upload</button>
                </form>
            </div>
            <h3>Uploaded Avatars</h3>
            <div class="uploaded-avatars">
                <p>These are your uploaded avatars. Choose one of your like for your profile. If you don't see one you like, you can upload one on the option above!</p>
                <div class="avatars">
                    <img @click="selectAvatar(avatar)" v-for="avatar in avatars.filter(a => a.name !== '.emptyFolderPlaceholder' && a.name.includes(storeUser.userId))" :key="avatar" :src="avatar.url"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pop-up {
    position: fixed;
    top: 20vh;
    height: 60%;
    width: 80%;
    background-color: cornsilk;
    border-radius: 12px;
    z-index: 10;
    overflow-y: scroll;

    h2 {
        position: fixed;
        margin: 0;
        height: 60px;
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background-color: var(--medium-green);
        border-radius: 12px 12px 0 0;
        z-index: 3;
    }

    .all-options {
        margin-top: 3.5rem;
    }

    h3 {
        position: relative;
        top: 20px;
        margin: 0 2rem;
        padding: 0.5rem;
        width: fit-content;
        color: white;
        background-color: var(--main-green);
        border-radius: 12px;
        z-index: 2;
    }

    img {
        height: 100px;
        width: 100px;
        border: 3px dashed orange;
        border-radius: 12px;
    }

    form {
        margin: 0 1rem 2rem;
        padding: 2rem 1rem 1rem 1rem;
        top: 2.5rem;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        text-align: start;
        font-size: 1.2rem;
        color: var(--dark-green);
        background-color: white;
        border: 3px dashed var(--light-green);
        border-radius: 12px;

        label {
            margin: 1rem;
            padding: 1rem;
            color: white;
            background-color: var(--carmin);
            border-radius: 12px;
        }

        button {
            margin-top: 1rem;
            padding: 10px;
            color: white;
            background-color: var(--dark-green);
            border: none;
            border-radius: 5px;
        }
    }

    p {
        padding: 10px;
        width: 100%;
        text-align: center;
        background-color: var(--white-yellow);
        border: 3px dashed var(--carmin);
        border-radius: 5px;
    }

    .change-avatar {
        h3 {
            position: relative;
            top: 20px;
            margin: 0 2rem;
            padding: 0.5rem;
            width: fit-content;
            color: white;
            background-color: var(--main-green);
            border-radius: 12px;
            z-index: 2;
        }
    }

    .uploaded-avatars {
        margin: 0 1rem 1rem;
        padding: 2rem 1rem 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        text-align: start;
        font-size: 1.2rem;
        color: var(--dark-green);
        background-color: white;
        border: 3px dashed var(--light-green);
        border-radius: 12px;

        .avatars {
            margin: 1rem 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
        }
    }
}

@media screen and (min-width: 700px) {
    .pop-up {
        height: 70%;
    }
}
</style>