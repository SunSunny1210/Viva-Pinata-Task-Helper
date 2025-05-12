<script setup>
import { useTaskStore } from '@/stores/task-store';
import { computed, ref } from 'vue';

const props = defineProps({
    task: Object
});

const taskInfo = computed(() => props.task.task_info);

const taskStore = useTaskStore();

const status = ref('');

console.log(props.task)

const markTask = async () => {
    status.value = 'completed';
    console.log(status.value)
    await taskStore.markAsCompleted(status.value, props.task.id)
}
</script>

<template>
    <div class="task" v-if="props.task.status === 'pending'">
        <h2>{{ props.task.title }}</h2>
        <div v-if="props.task.title === 'Get Piñata'" class="get-piñata">
            <div class="task-target">
                <img :src="taskInfo.img_URL" />
                <div class="target">
                    <span>{{ taskInfo.name }}</span>
                    <button @click="markTask">Mark as Completed</button>
                </div>
            </div>
            <div class="task-info">
                <ul>
                    <h4>Appear</h4>
                    <li v-if="!taskInfo.requirements.appear.length">Non existent requirements.</li>
                    <li v-for="appear in taskInfo.requirements.appear" :key="props.task.id">{{ appear }}</li>
                </ul>
                <ul>
                    <h4>Visit</h4>
                    <li v-if="!taskInfo.requirements.visit.length">Non existent requirements.</li>
                    <li v-for="visit in taskInfo.requirements.visit" :key="props.task.id">{{ visit }}</li>
                </ul>
                <ul>
                    <h4>Resident</h4>
                    <li v-for="resident in taskInfo.requirements.resident" :key="props.task.id">{{ resident }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .task {
        background-color: var(--background-yellow);
        border-radius: 12px;

        h2 {
            margin: 0;
            padding: 1rem;
            color: white;
            background-color: var(--dark-green);
            border-radius: 12px 12px 0 0;
        }

        .get-piñata {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;

            .task-target {
                height: 100%;
                display: flex;
                justify-content: center;
                gap: 1rem;

                img {
                    width: 50%;
                    border: 5px dashed orange;
                    border-radius: 12px;
                }

                .target {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;

                    span {
                        padding: 1rem;
                        color: white;
                        background-color: var(--main-green);
                        border-radius: 12px;
                    }

                    button {
                        padding: 10px;
                        color: white;
                        background-color: var(--dark-green);
                        border: none;
                        border-radius: 5px;
                    }
                }
            }

            .task-info {
                position: relative;

                
                ul {
                    position: relative;
                    margin-top: 3rem;
                    padding: 0;
                    background-color: white;
                    border: 3px dashed var(--carmin);
                    border-radius: 12px;
                    
                    h4 {
                        margin: 0;
                        padding: 1rem;
                        position: relative;
                        top: -25px;
                        left: 20px;
                        width: fit-content;
                        color: white;
                        letter-spacing: 2px;
                        background-color: var(--main-green);
                        border-radius: 12px;
                    }

                    li {
                        margin-left: 2rem;
                        margin-bottom: 2rem;

                    }

                    li::marker {
                        color: var(--carmin);
                    }
                }
            }
        }
    }
</style>