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