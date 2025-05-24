import { defineStore } from "pinia";
import { useUserStore } from "./store";
import { addNewAward, getAllAwards, updateAward } from "@/api/supabase/piñatasAPI";
import { ref } from "vue";
import { useTaskStore } from "./task-store";

export const useAwardStore = defineStore('awardStore', () => {
    //State
    const userStore = useUserStore();
    const {userId: userID} = userStore;

    const awardsData = ref([])

    //Getters

    //Actions
    const setAwardData = (data) => {
        awardsData.value = data
        console.log(awardsData.value)
    }

    const awardUpdate = async (piñata, column) => {
        try {
            console.log(awardsData.value)
            if (!awardsData.value.length || !awardsData.value.includes(piñata)) {
                const data = await addNewAward(userID, piñata, column);
    
                if (data) {
                    setAwardData(data)
                }
            } else if (awardsData.value.includes(piñata)) {
                const data = await updateAward(userID, piñata, column)

                if (data) {
                    setAwardData(data)
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const getAwards = async () => {
        try {
            const data = await getAllAwards(userID)

            if (data) {
                setAwardData(data)
                console.log(awardsData)
            }

            return data
        } catch (err) {
            console.error(err)
            return []
        }
    }

    return { setAwardData, awardsData, awardUpdate, getAwards }
})