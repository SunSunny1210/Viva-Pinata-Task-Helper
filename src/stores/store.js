import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getAvatars, getAvatarByName, getPiñatas, uploadAvatar, updateProfileInfo } from '@/api/supabase/piñatasAPI'

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

export const useAvatarsStore = defineStore('avatarsStore', () => {
    //State
    const avatars = ref([])
    //Getters
    //Actions
    const fetchAvatars = async () => {
        try {
            const data = await getAvatars();
            avatars.value = data
        } catch (err) {
            console.error(err);
            return []
        }
    }
    console.log(avatars)
    
    return { avatars, fetchAvatars}
});

export const useUserStore = defineStore('userStore', () => {
    //State
    const userData = ref(null);

    //Getters
    const userId = computed(() => userData.value?.user?.id || null);

    //Actions
    const setUserData = (data) => {
        if (!userData.value) {
            userData.value = data;
        } 
    };

    return { userData, userId, setUserData }
}, {
    persist: true
});

export const useProfileStore = defineStore('profileStore', () => {
    //State
    const profileData = ref(null);

    //Getters
    //Actions
    const setProfileData = (data) => {
        profileData.value = {
            ...profileData.value,
            ...data,
        };
    };

    const updateProfileAvatar = async (file) => {
        const userStore = useUserStore();

        if (file) {
            try {
                const avatarPath = await uploadAvatar(file);
                
                if (avatarPath) {
                    const filePublicURL = await getAvatarByName(avatarPath);
                    const userId = userStore.userId;
                    await updateProfileInfo(userId, "avatar_url", filePublicURL);

                    setProfileData({
                        avatar_url: filePublicURL
                    })
                }
            } catch (err) {
                console.error(err)
            }
        }
    }

    return { profileData, setProfileData, updateProfileAvatar }
})