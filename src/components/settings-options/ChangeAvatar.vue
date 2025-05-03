<script setup>
import { useAvatarsStore, useProfileStore } from '@/stores/store';
import { onMounted, ref } from 'vue';

const newAvatarURL = ref('');
const selectedFile = ref(null);
const storeProfile = useProfileStore();
const storeAvatar = useAvatarsStore();
const selectedAvatar = ref(null)

const selectAvatar = async (avatar) => {
     const confirmed = confirm(`Do you want to set ${avatar.url} as your avatar?`);
     if (!confirmed) return;

     try {
         selectedAvatar.value = avatar;
         await storeProfile.updateProfileAvatar(avatar.url);
         console.log('Avatar updated via selection!');
     } catch (err) {
         console.error('Error selecting avatar:', err);
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
        
        await storeProfile.updateProfileAvatar(selectedFile.value)
    } catch (err) {
        console.error(err)
    }
}


onMounted(async () => {
    await storeAvatar.fetchAvatars();
})
</script>

<template>
    <div class="pop-up">
        <div class="change-avatar">
            <h2>Change Avatar</h2>
            <form @submit.prevent="handleSubmit">
                <label for="title">Upload your avatar</label>
                <input type="file" id="upload" name="avatar_upload" accept="image/*" @change="handleFileChange" hidden/>
                <label for="upload" class="upload-btn">Select your file</label>
                <img class="preview" :src="newAvatarURL" />
                <button type="submit">Upload</button>
            </form>
            <div class="uploaded-avatars">
                <h3>Uploaded Avatars</h3>
                <p>These are your uploaded avatars. Choose one of your like for your profile. If you don't see one you like, you can upload one on the option above!</p>
                <div class="avatars">
                    <img @click="selectAvatar(avatar)" v-for="avatar in storeAvatar.avatars" :key="avatar" :src="avatar.url"/>
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
    box-shadow: 0 0 5px 2000px rgba(0, 0, 0, 0.4);
    z-index: 7;

    .change-avatar {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
    
        h3 {
            font-size: 1.5rem;
            font-weight: lighter;
            text-align: center;
            color: var(--dark-green);
        }
        
        
        h2 {
            margin: 0;
            height: 30%;
            min-height: 60px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            background-color: var(--medium-green);
            border-radius: 12px 12px 0 0;
        }
    
        form {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            
            label {
                margin: 1rem;
                font-size: 1.5rem;
                color: var(--dark-green);
                border-radius: 12px;
            }
            
            .upload-btn {
                margin-bottom: 1rem;
                padding: 0.5rem;
                height: 3rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: var(--main-green);
            }
    
            input {
                margin: 1rem;
                padding: 10px;
                height: 2rem;
                width: 80%;
                border: 3px dashed orange;
                border-radius: 5px;
            }
            
            img {
                margin-bottom: 1rem;
                border-radius: 12px;
            }
            
            ::placeholder {
                color: darkolivegreen;
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

        .uploaded-avatars {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            p {
                margin: 1.5rem;
                padding: 10px;
                text-align: center;
                background-color: var(--white-yellow);
                border: 3px dashed var(--carmin);
                border-radius: 5px;
            }

            .avatars {
                padding: 1rem;
                width: 80%;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                gap: 10px;
                background-color: var(--background-yellow);
                border-radius: 12px;

                img {
                    height: 100px;
                    width: 100px;
                    border: 3px dashed orange;
                    border-radius: 12px;
                }
            }
        }
    }
}
</style>