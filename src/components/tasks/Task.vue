<script setup>
import { useTaskStore } from '@/stores/task-store';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    task: Object
});

const taskStore = useTaskStore();

const taskInfo = computed(() => props.task.task_info);
const updatedAt = computed(() => props.task.updated_at);

const formattedDate = computed(() => {
    if (updatedAt.value.includes('T')) {
        const [date, time] = updatedAt.value.split('T');
        return `${date} ${time.slice(0, 5)}`;
    }
});
const status = ref('');
const checked = ref({});

console.log(props.task);

const markTask = async () => {
    status.value = 'completed';
    console.log(status.value)
    await taskStore.markAsCompleted(status.value, props.task.id)
}

const deleteTask = async () => {
    await taskStore.deleteChoosenTask(props.task.id)
}

onMounted(async () => {
    await taskStore.getAllTasks()
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
                        <input type="checkbox" v-model="checked[appear]"/>
                    </li>
                </ul>
                <ul>
                    <h4>Visit</h4>
                    <li v-if="!taskInfo.requirements.visit.length">Non existent requirements.</li>
                    <li v-for="visit in taskInfo.requirements.visit" :key="props.task.id" :class="{ 'checked': checked[visit] }">{{ visit }}
                        <input type="checkbox" v-model="checked[visit]"/>
                    </li>
                </ul>
                <ul>
                    <h4>Resident</h4>
                    <li v-for="resident in taskInfo.requirements.resident" :key="props.task.id" :class="{ 'checked': checked[resident] }">{{ resident }}
                        <input type="checkbox" v-model="checked[resident]"/>
                    </li>
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
                    <li v-for="romance in taskInfo.requirements.romance" :key="props.task.id" :class="{ 'checked': checked[romance] }">{{ romance }}
                        <input type="checkbox" v-model="checked[romance]"/>
                    </li>
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
                    <div class="variant-info">
                        <h4>{{ color.charAt(0).toUpperCase() + color.slice(1) }}</h4>
                        <li v-if="!info.requirement.length">Non existent variants.</li>
                        <li :class="{ 'checked': checked[info.requirement] }">{{ info.requirement }}
                            <input type="checkbox" v-model="checked[info.requirement]"/>
                        </li>
                    </div>
                    <div class="variant-img">
                        <img v-if="info.variant_img" :src="info.variant_img" />
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

                .delete-btn {
                    margin-top: 0;
                    background-color: var(--carmin);
                }
            }
        }

        .task-info {
            position: relative;

            .variant-ul {
                display: flex;
                justify-content: space-between;
                align-items: center;
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
                    top: -25px;
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

                .variant-img {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;

                    img {
                        margin-right: 1rem;
                        height: 100px;
                        width: 100px;
                        border: 4px dashed orange;
                        border-radius: 12px;
                    }
                }
            }
        }
        
        .completed {
            padding: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;

            img {
                height: 100px;
                width: 100px;
                border: 5px dashed orange;
                border-radius: 12px;
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
</style>