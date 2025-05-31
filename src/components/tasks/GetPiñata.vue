<script setup>
import { usePiñataStore } from '@/stores/store';
import { onBeforeMount, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['selected-piñata', 'close-menu'])

const piñataStore = usePiñataStore();

onMounted(async () => {
    await piñataStore.fetchPiñatas()
})
</script>

<template>
    <div class="get-piñatas">
        <div class="choose-piñata">
            <h3>Choose your Piñata</h3>
            <button @click="$emit('close-menu')">X</button>
            <p>What piñata do you need? Choose it from the list below to get started!</p>
            <div v-for="piñata in piñataStore.piñatas" :key="piñata" class="piñatas" @click="$emit('selected-piñata', piñata)">
                <img  :src="piñata.img_URL" />
                <span>{{ piñata.name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .get-piñatas {
        margin-bottom: 1rem;
        
        .choose-piñata {
            position: relative;
            display: flex;
            flex-direction: column;
            background-color: var(--background-yellow);
            border-radius: 12px;

            button {
                padding: 5px 10px;
                position: absolute;
                top: 15px;
                right: 15px;
                color: white;
                background-color: var(--main-green);
                border: none;
                border-radius: 5px;
            }

            h3 {
                margin: 0;
                padding: 1rem;
                color: white;
                background-color: var(--dark-green);
                border-radius: 12px 12px 0 0;
            }

            p {
                margin: 1rem;
                padding: 0.5rem;
                color: var(--dark-green);
                background-color: white;
                border: 3px dashed var(--carmin);
                border-radius: 12px;
            }

            .piñatas {
                margin: 1rem 0;
                padding: 0 1rem;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                gap: 10px;
                
                img {
                    height: 100px;
                    width: 110px;
                    max-width: 130px;
                    border: 3px dashed orange;
                    border-radius: 12px;
                    flex: 1;
                }
                
                span {
                    padding: 10px;
                    width: fit-content;
                    max-width: 114px;
                    text-align: center;
                    word-wrap: break-word;
                    color: var(--dark-green);
                    background-color: cornsilk;
                    border-radius: 12px;
                    flex: 1;
                }
            }
        }
    }

    @media screen and (min-width: 700px) {
        img {
            min-height: 120px;
        }
    }

    @media screen and (min-width: 750px) {
        .get-piñatas {
            .choose-piñata {
                p {
                    font-size: 1.2rem;
                }

                .piñatas {
                    gap: 2rem;

                    span {
                        padding: 1rem;
                        width: 100%;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 1020px) {
        .get-piñatas {
            .choose-piñata {
                .piñatas {
                    span {
                        max-width: 114px;
                    }
                }
            }
        }
    }
</style>