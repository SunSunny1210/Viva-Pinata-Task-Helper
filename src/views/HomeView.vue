<script setup>
import WhatToDo from './WhatToDo.vue';
import Task from '@/components/tasks/Task.vue';
import { nextTick, onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/task-store';
import GetPiñata from '@/components/tasks/GetPiñata.vue';
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore();

const { tasksData } = storeToRefs(taskStore);

const selectedOption = ref('');
const selectedPiñata = ref('');

const getPiñataRef = ref(null);

const OPTIONS = [
    '+ Get Piñata',
    '+ Romance Piñatas',
    '+ Piñata Variants'
]

const addTask = async () => {
    try {
        if (selectedOption.value) {
            await taskStore.addNewTask(selectedOption.value, selectedPiñata.value, 'pending')
        }
    } catch (err) {
        console.error(err)
    }
}

const handleTask = (option) => {
    if (option) {
        selectedOption.value = option.replace('+ ', '');
        console.log(selectedOption.value)
        console.log(getPiñataRef.value)

        setTimeout(() => {
            nextTick(() => {
                if (getPiñataRef.value?.$el) {
                    getPiñataRef.value.$el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        }, 200);
    }
}

const handlePiñata = async (piñata) => {
    if (piñata) {
        selectedPiñata.value = piñata;
        await addTask();
        selectedOption.value = '';
        console.log('Selected Piñata: ', piñata);
    }
}

onMounted(async () => {
    await taskStore.getAllTasks();
    console.log(tasksData.value)
})
</script>

<template>
    <div class="home">
        <article>
            <div class="section-title">
                <h1>What do you wanna do today?</h1>
            </div>
            <div class="section-info">
                <WhatToDo @add-task="handleTask" :options="OPTIONS"/>
            </div>
        </article>
        <article>
            <div class="section-title">
                <h1>Current tasks</h1>
            </div>
            <div class="section-info">
                <GetPiñata v-if="selectedOption" @selected-piñata="handlePiñata" ref="getPiñataRef"/>
                <span class="no-tasks" v-if="taskStore.tasksData.every(task => task.status === 'completed')">No current tasks.</span>
                <Task v-for="task in tasksData.filter(task => task.status === 'pending')" :task="task"/>
                </div>
            </article>
            <article>
                <div class="section-title">
                    <h1>Completed tasks</h1>
                </div>
                <div class="section-info">
                    <span class="no-tasks" v-if="taskStore.tasksData.every(task => task.status === 'pending')">No completed tasks.</span>
                <Task v-for="task in tasksData.filter(task => task.status === 'completed')" :task="task"/>
            </div>
        </article>
    </div>
</template>

<style>
    .home {
        padding: 1rem;
        height: 100%;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        overflow-y: scroll;

        article {
            height: fit-content;
            width: 100%;
            position: relative;
            top: 0;
            display: flex;
            flex-direction: column;
            
            .section-title {
                background-color: var(--medium-green);
                border-radius: 12px 12px 0 0;

                h1 {
                    margin: 0;
                    padding: 10px;
                    font-size: 1.2rem;
                    color: white;
                }
            }

            .section-info {
                padding: 1rem;
                display: flex;
                flex-direction: column;
                background-color: var(--light-green);
                border-radius: 0 0 12px 12px;

                .no-tasks {
                    padding: 1rem;
                    color: var(--dark-green);
                    background-color: var(--background-yellow);
                    border-radius: 12px;
                }
            }
        }
    }
</style>