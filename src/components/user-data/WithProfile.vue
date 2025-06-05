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
            <div class="img-profile">
                <img :src="profileData.avatar_url" alt="profile-avatar" />
            </div>
            <div class="profile-names">
                <span>{{ profileData.username }}</span>
                <span>{{ profileData.farm_name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .background {
        margin: 1rem;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--medium-green);
        
        .profile-info {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
    
            .img-profile {
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex: 5;

                img {
                    min-height: 55%;
                    max-height: 70%;
                    min-width: 55%;
                    max-width: 100%;
                    border-radius: 12px;
                    border: 4px solid yellow;
                }
            }
    
            .profile-names {
                margin-left: 10px;
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 10px;
                flex: 5;
                
                span {
                    padding: 5px;
                    width: 100%;
                    font-size: 2vh;
                    color: white;
                    background-color: var(--white-yellow);
                    border-radius: 5px;
                }
            }
        }
    }

    @media screen and (min-width: 750px) {
        .background {
            .profile-info {
                .img-profile {
                    padding: 0;

                    img {
                        min-height: 65%;
                    }
                }
            }
        }
    }
</style>