import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getAvatars, getAvatarByName, getPiñatas, updateProfileInfo, updateUserInfo, getUser, logOut, deleteUser, signUp, login, getProfile, createProfile, uploadAvatar } from '@/api/supabase/piñatasAPI'

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
    const profileStore = useProfileStore();
    const avatars = ref([])
    //Getters
    //Actions
    const uploadNewAvatar = async (file) => {
        try {
            await profileStore.updateProfileAvatar(file);

            console.log("Avatar uploaded correctly")
        } catch (err) {
            console.error("Error uploading avatar", err)
        }
    }

    const fetchAvatars = async () => {
        try {
            const data = await getAvatars();
            avatars.value = data;
        } catch (err) {
            console.error(err);
            return []
        }
    }
    console.log(avatars)
    
    return { avatars, fetchAvatars, uploadNewAvatar}
});

export const useUserStore = defineStore('userStore', () => {
    //State
    const userData = ref(null);
    const profileStore = useProfileStore();

    //Getters
    const userId = computed(() => userData.value?.user?.id || null);

    //Actions
    const setUserData = (data) => {
        userData.value = data
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
            const { data, error } = await signUp(email, password);
    
            if (error) {
                console.error('Registration error:', error.message);
                return error.message;
            }
    
            if (data) {
                setUserData(data);
                return 'User registered successfully!';
            }
        } catch (err) {
            console.error('Unexpected error:', err.message);
            return err.message;
        }
    };

    const loginUser = async (email, password) => {
        try {
            const { data, error } = await login(email, password);

            if (error) {
                console.error('Login error:', error.message)
                return error.message;
            }

            if (data) {
                setUserData(data);
                return 'User logged in successfully!';
            }
        } catch (err) {
            console.error(err);
            return err.message;
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

            if (noUser) {
                setUserData(null);
                profileStore.removeProfileData();
                return true;
            };

        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const deleteUserData = async () => {
        try {
            const deleteRequest = await deleteUser(userId);

            if (deleteRequest) {
                setUserData(null);
                profileStore.setProfileData(null);
                return true;
            };

        } catch (err) {
            console.error(err);
            return false;
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
    const removeProfileData = () => {
        profileData.value = null
    }

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
                setProfileData(data);
            }
        } catch (err) {
            console.error(err)
        }
    }

    const getProfileData = async () => {
        const check = await getProfile();

        if (check) {
            profileData.value = check
            console.log(check)
        } else {
            console.log("No existent profile")
        }
    }

    const updateProfileData = async (columnName, newData) => {
        if (columnName && newData) {
            console.log(userStore.userId)
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

    return { profileData, setProfileData, updateProfileAvatar, updateProfileData, getProfileData, createProfileData, removeProfileData }
})