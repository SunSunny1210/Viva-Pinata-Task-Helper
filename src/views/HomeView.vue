<script setup>
import { RouterLink } from 'vue-router';
import WhatToDo from './WhatToDo.vue';
import Task from '@/components/tasks/Task.vue';
import { ref } from 'vue';

const tasks = ref([]);

const OPTIONS = [
    '+ Get Piñata',
    '+ Romance Piñatas',
    '+ Piñata Variants'
]

const addTask = (option) => {
    if (option === '+ Get Piñata') {

    }
}
</script>

<template>
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
            <Task v-for="task in tasks" :key="" />
        </div>
    </article>
    <article>
        <div class="section-title">
            <h1>Completed tasks</h1>
        </div>
        <div class="section-info">
            <RouterLink />
        </div>
    </article>
</template>

<style>
    article {
        margin: 1rem;
        width: 80%;
        
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
            background-color: white;
            border-radius: 0 0 12px 12px;
        }
    }
</style>