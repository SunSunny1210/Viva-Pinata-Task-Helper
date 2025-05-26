import { defineStore } from "pinia";
import { useUserStore } from "./store";
import { addNewAward, getAllAwards, updateAward } from "@/api/supabase/piñatasAPI";
import { ref } from "vue";

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
            const data = ref(null);

            const awardExist = awardsData.value.some(award => award.piñata === piñata);

            if (!awardExist) {
                data.value = await addNewAward(piñata, column);
            } else {
                data.value = await updateAward(userID, piñata, column)
            }

            if (data.value) {
                setAwardData(data.value);
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