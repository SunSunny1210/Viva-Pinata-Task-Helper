<script setup>
import { RouterLink } from 'vue-router';
import WhatToDo from './WhatToDo.vue';
import Task from '@/components/tasks/Task.vue';
import { onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/task-store';
import GetPiñata from '@/components/tasks/GetPiñata.vue';

const taskStore = useTaskStore();

const selectedOption = ref('');
const selectedPiñata = ref('');

const OPTIONS = [
    '+ Get Piñata',
    '+ Romance Piñatas',
    '+ Piñata Variants'
]

const addTask = async (option) => {
    if (option === '+ Get Piñata') {
        selectedOption.value = option.replace('+ ', '');
    }
}

const handlePiñata = (piñata) => {
    if (piñata) {
        selectedPiñata.value = piñata;
        console.log('Selected Piñata: ', piñata);
    }
}

onMounted(async () => {
    await taskStore.getAllTasks();
})
</script>

<template>
    <div class="home">
        <article>
            <div class="section-title">
                <h1>What do you wanna do today?</h1>
            </div>
            <div class="section-info">
                <WhatToDo @add-task="addTask" :options="OPTIONS"/>
            </div>
        </article>
        <article>
            <div class="section-title">
                <h1>Current tasks</h1>
            </div>
            <div class="section-info">
                <span class="no-tasks" v-if="!taskStore.tasks">No current tasks</span>
                <GetPiñata v-if="selectedOption === 'Get Piñata'" />
                <Task v-for="task in taskStore.tasksData" :key="task" @selected-piñata="handlePiñata"/>
            </div>
        </article>
        <article>
            <div class="section-title">
                <h1>Completed tasks</h1>
            </div>
            <div class="section-info">
            </div>
        </article>
    </div>
</template>

<style>
    .home {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;

        article {
            margin: 1rem;
            height: fit-content;
            width: 80%;
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
                background-color: var(--main-green);
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