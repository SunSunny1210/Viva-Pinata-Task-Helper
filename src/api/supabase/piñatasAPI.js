import { supabase } from "./supabase";

//Get piñatas
export const getPiñatas = async () => {
    try {
        const { data, error } = await supabase
            .from('Species')
            .select()

        if (error) {
            throw new Error(error.message)
        }

        return data
    } catch (err) {
        console.error(err)
        return [];
    }
}

//Create user
export const signUp = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'http://localhost:5173/create-profile'
            }
        });

        if (error) {
            throw new Error('Error during sign-up: ' + error.message);
        }

        console.log('Sign-up successful. Email confirmation required.');
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

//Login user
export const login = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            throw new Error(error.message)
        }

        return data
    } catch (err) {
        console.error(err)

        return null
    }
}

//Update User
export const updateUserInfo = async (email, password) => {
    try {
        if (!email && !password) {
            console.log("No email nor password provided.")
        }

        const { data, error } = await supabase.auth.updateUser({
            email,
            password
        })

        if (error) {
            throw new Error("User couldn't be updated", error.message);
        }

        console.log("User updated successfully");
        return data;
    } catch (err) {
        console.error(err)
        return null
    }
}

//Get user
export const getUser = async () => {
    try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
            throw new Error(error.message);
        }

        return data

    } catch (err) {
        console.error(err);

        return null
    }
}

//Log Out
export const logOut = async () => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw new Error("Error logging out", error.message);
        } else {
            console.log("Log out successful");
        }
    } catch (err) {
        console.error(err)
    }
}

//Delete user
export const deleteUser = async (userId) => {
    try {
        const { error } = await supabase.auth.admin.deleteUser(userId)

        if (error) {
            throw new Error(error.message)
        }

        
    } catch (err) {
        console.error(err)
    }
};

//Create Profile
export const createProfile = async (userId, username, avatarUrl, farmName) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .insert([
                {
                    id: userId,
                    username: username.value,
                    avatar_url: avatarUrl.value,
                    farm_name: farmName.value
                }
            ])

        if (error) {
            throw new Error(error.message)
        }

        console.log("Profile created successfully")
        return data
    } catch (err) {
        console.error(err)

        return null
    }
}

//Get Profile
export const getProfile = async () => {
    try {
        const userData = await getUser();

        if (!userData) {
            throw new Error("No active session found")
        }

        const userId = userData.user.id

        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        
        if (error) {
            throw new Error(error.message)
        };

        return profile
    } catch (err) {
        console.error(err)
    }
}

//Update Profile
export const updateProfileInfo = async (id, columnName, newData) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .update({ [columnName]: newData })
            .eq('id', id);

        if (error) {
            throw new Error("Profile couldn't be updated", error.message);
        }

        console.log("Profile updated successfully");
        return data;
    } catch (err) {
        console.error(err)
    }
}

//Upload Avatar
export const uploadAvatar = async (file) => {
    try {
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage
            .from('avatars')
            .upload(fileName, file)

        if (error) {
            throw new Error(error.message)
        }

        return data.path
    } catch (err) {
        console.error(err)
        return null
    }
}

//Get Avatars
export const getAvatars = async () => {
    try {
        const { data, error } = await supabase.storage
            .from("avatars")
            .list()

        if (error) {
            throw new Error(error.message)
        }

        const avatars = data.map(file => ({
            name: file.name,
            url: supabase.storage.from("avatars").getPublicUrl(file.name).data.publicUrl
        }));

        return avatars
    } catch (err) {
        console.error(err)
        return []
    }
}

export const getAvatarByName = async (name) => {
    try {
        return await supabase.storage.from("avatars").getPublicUrl(name).data.publicUrl
    } catch (err) {
        console.error(err)
        return ''
    }
}