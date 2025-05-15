<script setup>
import { useProfileStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const storeProfile = useProfileStore();

const { profileData } = storeToRefs(storeProfile);
console.log(profileData)

onMounted(async () => {
    await storeProfile.getProfileData();
})
</script>

<template>
    <div class="background">
        <div class="profile-info">
            <img :src="profileData.avatar_url" alt="profile-avatar" />
            <div class="profile-names">
                <span>{{ profileData.username }}</span>
                <span>{{ profileData.farm_name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .background {
        background-color: var(--medium-green);
        padding: 0 16px;
        height: 20%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
        .profile-info {
            display: flex;
            justify-content: center;
            align-items: center;
    
            img {
                height: 90px;
                width: 90px;
                border-radius: 12px;
                border: 5px dashed  yellow;
            }
    
            .profile-names {
                margin-left: 10px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                gap: 10px;
                
                span {
                    padding: 5px;
                    color: white;
                    background-color: var(--white-yellow);
                    border-radius: 5px;
                }
            }
        }
    }

    @media screen and (min-width: 700px) {
        .background {
            height: 35%;
        }
    }
</style>