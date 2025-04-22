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
            password
        })

        if (error) {
            console.error("ERRORBITCH", error.message)
            throw new Error(error.message)
        }

        return data
    } catch (err) {
        console.error(err)

        return null
    }
}

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
    console.log({
        id: userId.id,
        username: username.value,
        avatar_url: avatarUrl.value,
        farm_name: farmName.value
      });
    try {
        const { data, error } = await supabase
            .from('profiles')
            .insert([
                {
                    id: userId.id,
                    username: username.value,
                    avatar_url: avatarUrl.value,
                    farm_name: farmName.value
                }
            ])

        if (error) {
            throw new Error(error.message)
        }

        return data
    } catch (err) {
        console.error(err)

        return null
    }
}