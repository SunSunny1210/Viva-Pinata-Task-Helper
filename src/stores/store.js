import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getAvatars, getAvatarByName, getPiñatas, uploadAvatar, updateProfileInfo, updateUserInfo, getUser, logOut, deleteUser, signUp, login, getProfile, createProfile } from '@/api/supabase/piñatasAPI'

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
    
    return { piñatas, fetchPiñatas }
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
    const profileStore = useProfileStore();

    //Getters
    const userId = computed(() => userData.value?.user?.id || null);

    //Actions
    const setUserData = (data) => {
        if (!userData.value) {
            userData.value = data;
        } 
    };

    const initializeUserData = async () => {
        try {
            const data = await getUser();
            setUserData(data);

            console.log("User initialized", data)
        } catch (err) {
            console.error("Error initializing user:", err);
        }
    };


    const registerUser = async (email, password) => {
        try {
            const data = await signUp(email, password);

            if (data) {
                setUserData(data);
            }
        } catch (err) {
            console.error(err)
        }
    }

    const loginUser = async (email, password) => {
        try {
            const data = await login(email, password);

            if (data) {
                setUserData(data);
            }
        } catch (err) {
            console.error(err)
        }
    }

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

    const logOutUser = async () => {
        try {
            const noUser = await logOut();

            if(noUser) {
                setUserData(null);
                profileStore.setProfileData(null);
            }

        } catch (err) {
            console.log(err)
        }
    }

    const deleteUserData = async () => {
        try {
            const deleteRequest = await deleteUser(userId);

            if (deleteRequest) {
                setUserData(null);
                profileStore.setProfileData(null);
            }
        } catch (err) {
            console.error(err)
        }
    }

    return { userData, userId, setUserData, updateUserData, checkUserLog, logOutUser, deleteUserData, registerUser, loginUser, initializeUserData }
});

export const useProfileStore = defineStore('profileStore', () => {
    //State
    const userStore = useUserStore();
    const profileData = ref(null);

    //Getters
    //Actions
    const setProfileData = (data) => {
        profileData.value = {
            ...profileData.value,
            ...data,
        };
    };

    const createProfileData = async (username, avatarUrl, farmName) => {
        try {
            const data = await createProfile(userStore.userId, username, avatarUrl, farmName);

            if (data) {
                setProfileData(data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const getProfileData = async () => {
        const check = await getProfile();

        if (check) {
            profileData.value = check
        } else {
            console.log("No existent profile")
        }
    }

    const updateProfileData = async (columnName, newData) => {
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

    const updateProfileAvatar = async (input) => {
        const userStore = useUserStore();
    
        try {
            let filePublicURL;
    
            if (input instanceof File) {
                const avatarPath = await uploadAvatar(input);
                if (avatarPath) {
                    filePublicURL = await getAvatarByName(avatarPath);
                }
            } else if (typeof input === 'string') {
                filePublicURL = input;
            }
    
            if (filePublicURL) {
                const userId = userStore.userId;
                await updateProfileInfo(userId, "avatar_url", filePublicURL);
    
                setProfileData({
                    avatar_url: filePublicURL
                });
    
                console.log('Avatar updated successfully!');
            } else {
                console.error('Failed to update avatar: No valid URL or file provided');
            }
        } catch (err) {
            console.error('Error updating avatar:', err);
        }
    };

    return { profileData, setProfileData, updateProfileAvatar, updateProfileData, getProfileData, createProfileData }
})