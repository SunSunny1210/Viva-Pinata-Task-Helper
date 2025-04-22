import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getPiñatas } from '@/api/supabase/piñatasAPI'

export const usePiñataStore = defineStore('piñataStore', () => {
    //State
    const piñatas = ref([])
    //Getters
    //Actions
    const fetchPiñatas = async () => {
        try {
            const data = await getPiñatas();
            piñatas.value = data
        } catch (err) {
            console.error(err);
            return []
        }
    }
    console.log(piñatas)
    
    return { piñatas, fetchPiñatas}
});

export const useUserStore = defineStore('userStore', () => {
    const userData = ref(null);
    
    const setUserData = (data) => {
        if (!userData.value) {
            userData.value = data;
        } 
    };

    return { userData, setUserData }
})

export const useProfileStore = defineStore('profileStore', () => {
    const profileData = ref(null);
    
    const setProfileData = (data) => {
        if (!profileData.value) {
            profileData.value = data;
        } 
    };

    return { profileData, setProfileData }
})