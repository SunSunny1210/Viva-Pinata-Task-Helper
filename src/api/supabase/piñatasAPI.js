import { supabase } from "./supabase";

//Get piñatas
export const getPiñatas = async () => {
    try {
        const { data, error } = await supabase
            .from('Species')
            .select()
            .order('name', { ascending: true })

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
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: 'http://localhost:5173/create-profile'
        }
    });

    if (error) {
        console.error('Error during sign-up:', error.message);
    }

    return { data, error };
};

//Login user
export const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        console.error('Error during sign-in:', error.message);
    }

    return { data, error };
}

//Reset Password
export const resetPassword = async (email) => {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            
        }
    } catch (err) {
        console.error(err)
    }
}

//Update User
export const updateUserInfo = async (email, password) => {
    try {
        if (!email && !password) {
            console.log("No email nor password provided.")
            return null;
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
        }
        
        console.log("Log out successful");
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

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
export const uploadAvatar = async (userId, file) => {
    try {
        const fileName = `${userId}_${file.name}`;
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
        const { data, error } = supabase.storage.from("avatars").getPublicUrl(name);

        if (error) {
            throw new Error(error.message);
        }

        return data.publicUrl;
    } catch (err) {
        console.error("Error retrieving avatar URL:", err);
        return null;
    }
};

//Get Tasks
export const getTasks = async () => {
    try {
        const { data, error } = await supabase
            .from('Tasks')
            .select('*')
            .order('updated_at', {ascending: true});
        
        if (error) {
            throw new Error(error.message)
        }

        return data
    } catch (err) {
        console.error(err)
    }
}

//Add Task
export const addTask = async (userId, title, taskInfo, status) => {
    try {
        const { data, error } = await supabase
            .from('Tasks')
            .insert([
                {
                    user_id: userId,
                    title,
                    task_info: taskInfo,
                    status
                }
            ])
            .select();

        if (error) {
            throw new Error('Error inserting task', error.message)
        }

        console.log('Task added successfully!')
        return data
    } catch (err) {
        console.error(err)
        return null
    }
}

//Update Task
export const updateTask = async (id, updatedColumns) => {
    try {
        const { data, error } = await supabase
            .from('Tasks')
            .update(updatedColumns)
            .eq('id', id)
            .select('*');

        if (error) {
            throw new Error("Task couldn't be updated", error.message);
        }

        console.log("Task updated successfully");
        return data;
    } catch (err) {
        console.error(err)
    }
}

//Delete Task
export const deleteTask = async (userId, taskId) => {
    try {
        const { data, error } = await supabase
            .from('Tasks')
            .delete()
            .eq('id', taskId)
            .eq('user_id', userId)
            .select()

        if (error) {
            throw new Error('Error during task deletion.', error.message)
        }

        console.log('Task deleted successfully!')
        return data;
    } catch (err) {
        console.error(err)
        return null
    }
}

//Add Award
export const addNewAward = async (piñata, column) => {
    try {
        const { data, error } = await supabase
            .from('Awards')
            .insert([
                {
                    [column]: true,
                    piñata: piñata
                }
            ])
            .select()

        if (error) {
            throw new Error('Error durign award addition')
        }

        return data
    } catch (err) {
        console.error(err)
    }
}

//Get Awards
export const getAllAwards = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('Awards')
            .select('*')
            .eq('user_id', userId)

        if (error) {
            throw new Error('Error during fetching all awards')
        }

        console.log('Awards fetched successfully!')
        return data
    } catch (err) {
        console.error(err)
        return []
    }
}

//Update Award
export const updateAward = async (userId, piñata, column) => {
    try {
        const { data, error } = await supabase
            .from('Awards')
            .update({ [column]: true })
            .eq('piñata', piñata)
            .eq('user_id', userId)
            .select()

        if (error) {
            throw new Error('Error during award updating')
        }

        console.log('Award updated successfully!')
        return data
    } catch (err) {
        console.error(err)
        return null
    }
}