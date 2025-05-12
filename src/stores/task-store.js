import { addTask, getTasks } from "@/api/supabase/piñatasAPI";
import { defineStore } from "pinia";
import { useUserStore } from "./store";
import { ref } from "vue";

export const useTaskStore = defineStore('tasksStore', () => {
    //State
    const userStore = useUserStore();
    const { userId: userID } = userStore;

    const tasksData = ref([]);
    //Getters
    //Actions
    const setTaskData = (data) => {
        tasksData.value = {
            ...tasksData.value,
            ...data
        }
    }

    const getAllTasks = async () => {
        try {
            const data = await getTasks();

            tasksData.value = data
        } catch (err) {
            console.error(err);
            return []
        }
    }

    const addNewTask = async (title, taskInfo, status) => {
        try {
            const data = await addTask(userID, title, taskInfo, status);

            if (data) {
                setTaskData(data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return { getAllTasks, tasksData, addNewTask }
})