<script setup>
import { useAwardStore } from '@/stores/award-store';
import { useTaskStore } from '@/stores/task-store';
import { computed, onMounted, ref } from 'vue';

//State
const props = defineProps({
    task: Object
});

const taskStore = useTaskStore();
const awardsStore = useAwardStore();

const status = ref('');
const checked = ref({
    visit: {},
    resident: {},
    romance: {},
    variants: {}
});


//Getters
const taskInfo = computed(() => props.task.task_info);
const updatedAt = computed(() => props.task.updated_at);

const formattedDate = computed(() => {
    if (updatedAt.value.includes('T')) {
        const [date, time] = updatedAt.value.split('T');
        return `${date} ${time.slice(0, 5)}`;
    } else {
        const [date, time] = updatedAt.value.split(', ');
        return `${date} ${time.slice(0, 5)}`
    }
});

const allVisitChecked = computed(() => {
    return taskInfo.value.requirements.visit.length > 0 &&
    taskInfo.value.requirements.visit.every(check => checked.value.visit[check])
})

const allResidentChecked = computed(() => {
    return taskInfo.value.requirements.resident.length > 0 &&
        taskInfo.value.requirements.resident.every(check => checked.value.resident[check])
})

const allRomanceChecked = computed(() => {
    return taskInfo.value.requirements.romance.length > 0 &&
        taskInfo.value.requirements.romance.every(check => checked.value.romance[check])
})

//Actions
const variantColumn = (color) => {
    const keys = Object.keys(taskInfo.value.variants);
    return 'variant_' + (keys.indexOf(color) + 1);
}

const markTask = async () => {
    status.value = 'completed';
    console.log(status.value)
    await taskStore.markAsCompleted(status.value, props.task.id)
}

const deleteTask = async () => {
    console.log(props.task.id)
    await taskStore.deleteChoosenTask(props.task.id)
}

const addAward = async (piñata, column) => {
    await awardsStore.awardUpdate(piñata, column)
}

onMounted(async () => {
    await taskStore.getAllTasks();
    console.log(props.task);
    await awardsStore.getAwards();
    console.log(awardsStore.awardsData);
})
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
                    <button class="delete-btn" @click="deleteTask">Delete Task</button>
                </div>
            </div>
            <div class="task-info">
                <ul>
                    <h4>Appear</h4>
                    <li v-if="!taskInfo.requirements.appear.length">Non existent requirements.</li>
                    <li v-for="appear in taskInfo.requirements.appear" :key="props.task.id" :class="{ 'checked': checked[appear] }">{{ appear }}
                        <input type="checkbox" v-model="checked[appear]" />
                    </li>
                </ul>
                <ul>
                    <h4>Visit</h4>
                    <li v-if="!taskInfo.requirements.visit.length">Non existent requirements.</li>
                    <li v-for="visit in taskInfo.requirements.visit" :key="props.task.id" :class="{ 'checked': checked.visit[visit] }">{{ visit }}
                        <input type="checkbox" v-model="checked.visit[visit]" />
                    </li>
                    <div v-if="allVisitChecked && !awardsStore.awardsData.some(award => award.piñata === taskInfo.name && award.visit)" class="add-award">
                        <p>Do you wish to add the visit award for this piñata?</p>
                        <button @click="addAward(taskInfo.name, 'visit')">Add 
                            <img src="../../assets/images/Visit.png" />
                        </button>
                    </div>
                </ul>
                <ul>
                    <h4>Resident</h4>
                    <li v-for="resident in taskInfo.requirements.resident" :key="props.task.id" :class="{ 'checked': checked.resident[resident] }">{{ resident }}
                        <input type="checkbox" v-model="checked.resident[resident]"/>
                    </li>
                    <div v-if="allResidentChecked && !awardsStore.awardsData.some(award => award.piñata === taskInfo.name && award.residence)" class="add-award">
                        <p>Do you wish to add the residence award for this piñata?</p>
                        <button @click="addAward(taskInfo.name, 'residence')">Add 
                            <img src="../../assets/images/Residence.png" />
                        </button>
                    </div>
                </ul>
            </div>
        </div>
        <div v-else-if="props.task.title === 'Romance Piñatas'" class="romance-piñata">
            <div class="task-target">
                <img :src="taskInfo.img_URL" />
                <div class="target">
                    <span>{{ taskInfo.name }}</span>
                    <button @click="markTask">Mark as Completed</button>
                    <button class="delete-btn" @click="deleteTask">Delete Task</button>
                </div>
            </div>
            <div class="task-info">
                <ul>
                    <h4>Romance</h4>
                    <li v-if="!taskInfo.requirements.romance.length">Non existent requirements.</li>
                    <li v-for="romance in taskInfo.requirements.romance" :key="props.task.id" :class="{ 'checked': checked.romance[romance] }">{{ romance }}
                        <input type="checkbox" v-model="checked.romance[romance]"/>
                    </li>
                    <div v-if="allRomanceChecked && !awardsStore.awardsData.some(award => award.piñata === taskInfo.name && award.romance)" class="add-award">
                        <p>Do you wish to add the romance award for this piñata?</p>
                        <button @click="addAward(taskInfo.name, 'romance')">Add 
                            <img src="../../assets/images/Romance.png" />
                        </button>
                    </div>
                </ul>
            </div>
        </div>
        <div v-else-if="props.task.title === 'Piñata Variants'" class="piñata-variants">
            <div class="task-target">
                <img :src="taskInfo.img_URL" />
                <div class="target">
                    <span>{{ taskInfo.name }}</span>
                    <button @click="markTask">Mark as Completed</button>
                    <button class="delete-btn" @click="deleteTask">Delete Task</button>
                </div>
            </div>
            <div class="task-info">
                <ul v-for="(info, color) in taskInfo.variants" :key="color" class="variant-ul">
                    <div class="variants">
                        <div class="variant-info">
                            <h4>{{ color.charAt(0).toUpperCase() + color.slice(1) }}</h4>
                            <li v-if="!info.requirement.length">Non existent variants.</li>
                            <li :class="{ 'checked': checked.variants[info.requirement] }">{{ info.requirement }}
                                <input type="checkbox" v-model="checked.variants[info.requirement]" />
                            </li>
                        </div>
                        <div class="variant-img">
                            <img v-if="info.variant_img" :src="info.variant_img" class="img_url"/>
                        </div>
                    </div>
                    <div v-if="checked.variants[info.requirement] && !awardsStore.awardsData.some(award => award.piñata === taskInfo.name && award[variantColumn(color)])" class="add-award">
                        <p>Do you wish to add this variant award for this piñata?</p>
                        <button @click="addAward(taskInfo.name, variantColumn(color))">Add 
                            <img src="../../assets/images/Residence.png" />
                        </button>
                    </div>
                </ul>
            </div>
        </div>
    </div>
    <div class="task" v-if="props.task.status === 'completed'">
        <h2>Completed: {{ props.task.title }}</h2>
        <div class="completed">
            <div class="img-and-btn">
                <img :src="taskInfo.img_URL" />
                <button class="delete-btn" @click="deleteTask">Delete Task</button>
            </div>
            <div class="completed-info">
                <p>{{ taskInfo.name }}</p>
                <p><span class="timestamp">Finished on:</span> {{ formattedDate }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .task {
        margin-bottom: 1rem;
        background-color: var(--background-yellow);
        border-radius: 12px;

        h2 {
            margin: 0;
            padding: 1rem;
            color: white;
            background-color: var(--dark-green);
            border-radius: 12px 12px 0 0;
        }

        .delete-btn {
            margin-top: 10px;
            padding: 10px;
            color: white;
            background-color: var(--carmin);
            border: none;
            border-radius: 5px;
        }

        .get-piñata,
        .romance-piñata,
        .piñata-variants {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }

        .task-target {
            padding: 1rem;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;

            img {
                height: 19vh;
                width: 50%;
                border: 5px dashed orange;
                border-radius: 12px;
            }

            .target {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 10px;

                span {
                    padding: 1rem;
                    width: 100%;
                    color: white;
                    text-align: center;
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

                .delete-btn {
                    margin-top: 0;
                    background-color: var(--carmin);
                }
            }
        }

        .task-info {
            position: relative;
            width: 100%;
            
            .add-award {
                margin: 1rem;
                padding: 10px;
                width: 90%;
                color: var(--dark-green);
                background-color: var(--background-yellow);
                border: 3px dashed orange;
                border-radius: 12px;

                button {
                    padding: 8px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    color: white;
                    background-color: var(--dark-green);
                    border: none;
                    border-radius: 12px;

                    img {
                        height: 8vh;
                        border-radius: 12px;
                    }
                }
            }
            
            .variant-ul {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-flow: column;

                .variants {
                    padding: 10px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                }

                li {
                    font-size: 1.1rem;
                    text-align: center;
                    margin: 0 2rem 2rem 2rem;
                }

                .img_url {
                    margin: 8px;
                    height: 100px;
                    width: 100px;
                    border: 4px dashed orange;
                    border-radius: 12px;
                }
            }
            
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
                    top: -30px;
                    left: 20px;
                    width: fit-content;
                    color: white;
                    letter-spacing: 2px;
                    background-color: var(--main-green);
                    border-radius: 12px;
                }

                li {
                    margin: 0 2rem 2rem;

                    input[type="checkbox"] {
                        margin: 10px 0 0 10px;
                        position: relative;
                        bottom: -2px;
                        appearance: none;
                        width: 20px;
                        height: 20px;
                        background-color: white;
                        border: 2px solid var(--carmin);
                        border-radius: 5px;
                        cursor: pointer;
                    }

                    input[type="checkbox"]:checked {
                        background-color: var(--carmin);
                        border-color: var(--main-green);
                    }

                    input[type="checkbox"]::before {
                        content: "✔";
                        font-size: 16px;
                        color: white;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        display: none;
                    }

                    input[type="checkbox"]:checked::before {
                        display: block;
                    }
                }

                li::marker {
                    color: var(--carmin);
                }

                .checked {
                    color: grey;
                }

            }
        }
        
        .completed {
            padding: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;

            .img-and-btn {
                display: flex;
                flex-direction: column;

                img {
                    height: 100px;
                    width: 100px;
                    border: 5px dashed orange;
                    border-radius: 12px;
                }
            }


            .completed-info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 10px;

                p {
                    margin: 0;
                    padding: 1rem;
                    width: fit-content;
                    line-height: 30px;
                    color: white;
                    background-color: var(--main-green);
                    border-radius: 12px;
                }

                .timestamp {
                    color: var(--dark-green);
                    text-decoration: underline;
                    text-decoration-style: wavy;
                    text-decoration-color: var(--carmin);
                }
            }
        }
    }

    @media screen and (min-width: 700px) {
        .get-piñata,
        .romance-piñata,
        .piñata-variants {
            img {
                height: 150px;
            }

        }

        .task {
            .task-target {
                img {
                    height: 150px;
                }
            }

            .task-info {
                .variant-ul {
                    .variants {
                        flex-direction: row;
                    }
                }
            }
        }

        .img-and-btn {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }
    }

    @media screen and (min-width: 750px) {
        .get-piñata,
        .romance-piñata,
        .piñata-variants {
            .task-target {
                .target {
                    span,
                    button,
                    .delete-btn {
                        font-size: 1.2rem;
                    }
                }
            }
        }

        .task {
            .completed {
                img {
                    height: 20vh;
                    width: 20vh;
                }

                .completed-info {
                    font-size: 1.2rem;
                }
            }
        }
    }

    @media screen and (min-width: 1020px) {
        .get-piñata,
        .romance-piñata,
        .piñata-variants {
            .task-info {
                .variant-ul {
                    .img_url {
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }

    @media screen and (max-height: 500px) {
        .piñata-variants {
            .task-target {
                img {
                    height: 40vh;
                }
            }
        }
    }
</style>