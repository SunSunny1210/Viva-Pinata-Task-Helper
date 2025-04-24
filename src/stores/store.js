import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getAvatars, getAvatarByName, getPiñatas, uploadAvatar, updateProfileInfo, updateUserInfo, getUser } from '@/api/supabase/piñatasAPI'

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

    const updateUserData = async (data) => {
        try {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data)
            const checking = isEmail
                ? await updateUserInfo(data)
                : await updateUserInfo(null, data);

            if (checking && isEmail) {
                setUserData({ email: data })
            }

        } catch (err) {
            console.error(err)
            return null
        }
    }

    const checkUserLog = async () => {
        try {
            const check = await getUser()

            return check
        } catch (err) {
            console.error(err)
        }
    }

    return { userData, userId, setUserData, updateUserData, checkUserLog }
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

    const updateProfileData = async (columnName, newData) => {
        const userStore = useUserStore();

        if (columnName && newData) {
            try {
                await updateProfileInfo(userStore.userId, columnName, newData)

                if (columnName === "username") {
                    setProfileData({
                        username: newData
                    })
                } else {
                    setProfileData({
                        farm_name: newData
                    })
                }
            } catch (err) {
                console.error(err)
                return null
            }
        }
    }

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

    return { profileData, setProfileData, updateProfileAvatar, updateProfileData }
})