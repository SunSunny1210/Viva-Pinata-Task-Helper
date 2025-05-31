<script setup>
import WhatToDo from './WhatToDo.vue';
import Task from '@/components/tasks/Task.vue';
import { nextTick, onMounted, ref, watchEffect } from 'vue';
import { useTaskStore } from '@/stores/task-store';
import GetPiñata from '@/components/tasks/GetPiñata.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/store';
import gsap from 'gsap';

const userStore = useUserStore();
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

        setTimeout(() => {
            nextTick(() => {
                getPiñataRef.value.$el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

const closePiñataMenu = () => {
    selectedOption.value = '';
} 

const scrollAToId = (target) => {
    document.querySelector(target).scrollIntoView({ behavior: 'smooth' })
}

onMounted(async () => {
    await taskStore.getAllTasks();
    console.log(tasksData.value);
})
</script>

<template>
    <div v-if="userStore.userData" class="home-user">
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
            <div class="section-info" id="expand">
                <GetPiñata v-if="selectedOption" @selected-piñata="handlePiñata" @close-menu="closePiñataMenu" ref="getPiñataRef"/>
                <span class="no-tasks" v-if="taskStore.tasksData.every(task => task.status === 'completed')">No current tasks.</span>
                <Task v-for="task in tasksData.filter(task => task.status === 'pending')" :key="task.id" :task="task"/>
            </div>
        </article>
        <article>
            <div class="section-title">
                <h1>Completed tasks</h1>
            </div>
            <div class="section-info">
                <span class="no-tasks" v-if="taskStore.tasksData.every(task => task.status === 'pending')">No completed tasks.</span>
                <Task v-for="task in tasksData.filter(task => task.status === 'completed')" :key="task.id" :task="task"/>
            </div>
        </article>
    </div>
    <div v-else class="home-no-user">
        <h1>Welcome!</h1>
        <div class="main">
            <div class="main-info">
                <p>This is Viva Piñata's Task Planner, a page to help you organize your progress on your farm in Viva Piñata.</p>
                <ul>
                    <li>
                        <a href="#get-started" @click.prevent="scrollAToId('#get-started')">Get Started</a>
                    </li>
                    <li>
                        <a href="#general-info" @click.prevent="scrollAToId('#general-info')">General Information</a>
                    </li>
                </ul>
            </div>
            <div class="get-started" id="get-started">
                <h2>Wanna get started?</h2>
                <p>To get started, you need to register to create an account. If you already have one, you can log in below!</p>
                <div class="buttons">
                    <RouterLink to="/register">Register</RouterLink>
                    <RouterLink to="/login">Login</RouterLink>
                </div>
            </div>
            <div class="general-info" id="general-info">
                <h2>General Information</h2>
                <p>If you don't want to make an account, you can still make use of the page to check general information about piñatas, town villagers, plants and more!</p>
                <div class="buttons">
                    <RouterLink to="/pinatas">Piñatas</RouterLink>
                    <RouterLink to="">Villagers</RouterLink>
                    <RouterLink to="">Plants & Seeds</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .home-user {
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

    .home-no-user {
        padding: 1rem;
        height: 100%;
        width: 100vw;
        overflow-y: scroll;
        
        h1 {
            margin: 0;
            padding: 1rem;
            width: 100%;
            color: white;
            background-color: var(--medium-green);
            border-radius: 12px 12px 0 0;
        }

        .main {
            padding: 1rem;
            background-color: var(--light-green);
            border-radius: 0 0 12px 12px;
            
            .main-info {
                padding: 1rem;
                font-size: 1.2rem;
                color: var(--dark-green);
                background-color: cornsilk;
                border: 3px dashed var(--carmin);
                border-radius: 12px;

                ul {
                    margin-top: 1rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 10px;

                    li {
                        padding: 10px;
                        background-color: var(--medium-green);
                        border-radius: 12px;

                        a {
                            color: white;
                            text-decoration: none;
                        }
                    }

                    ::marker {
                        color: orange;
                    }
                }
            }

            .get-started,
            .general-info {
                margin-top: 2rem;
                width: 100%;
                background-color: cornsilk;
                border-radius: 12px;

                h2 {
                    padding: 1rem;
                    color: white;
                    background-color: var(--dark-green);
                    border-radius: 12px 12px 0 0;
                }

                p {
                    margin: 1rem;
                    padding: 1rem;
                    font-size: 1.1rem;
                    color: var(--dark-green);
                    border: 3px dashed orange;
                    border-radius: 12px;
                }

                .buttons {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;

                    a {
                        margin-bottom: 1rem;
                        padding: 1rem;
                        width: 6rem;
                        font-size: 1.1rem;
                        color: white;
                        text-align: center;
                        text-decoration: none;
                        background-color: var(--medium-green);
                        border-radius: 12px;
                    }
                }
            }

            .general-info {
                .buttons {
                    padding: 1rem;
                    flex-direction: column;
                    align-items: flex-start;
                    font-size: 1.2rem;

                    a {
                        width: 100%;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 700px) {
        .home-user {
            margin-bottom: 2rem;
        }

        .home-no-user {
            margin-bottom: 2rem;

            .main {
                .get-started {
                    .buttons {
                        a {
                            height: 4rem;
                            width: 8rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 1.2rem;
                        }
                    }
                }
            }
        }
    }

    @media screen and (min-width: 750px) {
        .home-no-user,
        .home-user {
            margin-bottom: 3rem;
        }

        .home-user {
            article {
                .section-info {
                    .no-tasks {
                        font-size: 1.2rem;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 1020px) {
        .home-user {
            flex-direction: row;
            align-items: flex-start;
            overflow-y: auto;
            
            article {
                height: 100%;
                border-radius: 12px;
                overflow-y: scroll;
                
                .section-title {
                    h1 {
                        position: fixed;
                        width: calc(33.33vw - 1.33rem);
                        background-color: var(--medium-green);
                        border-radius: 12px 12px 0 0;
                        z-index: 8;
                    }
                }

                .section-info {
                    margin-top: 2.5rem;
                }
            }
        }

        .home-no-user {
            .main {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 1rem;

                .get-started,
                .general-info,
                .main-info {
                    margin-top: 0;
                    flex: 3;

                    h2 {
                        margin-top: 0;
                    }
                }

                .general-info {
                    height: 50vh;
                    overflow-y: scroll;

                    h2 {
                        position: fixed;
                        width: calc(33.33vw - 2.7rem);
                    }

                    p {
                        margin-top: 5rem;
                    }
                }
            }
        }

        ::-webkit-scrollbar {
            display: none;
        }
    }
</style>