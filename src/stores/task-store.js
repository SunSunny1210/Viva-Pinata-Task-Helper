import { addTask, getTasks, updateTask } from "@/api/supabase/piñatasAPI";
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
        tasksData.value = [...data]
    }

    const getAllTasks = async () => {
        try {
            const data = await getTasks();

            if (data) {
                setTaskData(data)
            }
            
            return data
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
                console.log(tasksData)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const markAsCompleted = async (statusData, taskId) => {
        try {
            const data = await updateTask(taskId, 'status', statusData);
            if (data) {
                const taskIndex = tasksData.value.findIndex(task => task.id === taskId);
                if (taskIndex !== -1) {
                    tasksData.value[taskIndex].status = statusData;
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return { getAllTasks, tasksData, addNewTask, markAsCompleted }
})