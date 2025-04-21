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
    const profileData = ref(null);

    const setUserData = (data) => {
        userData.value = data;

        if (userData.value) {
            profileData.value = data; 
        }
    };

    return { userData, profileData, setUserData }
})
