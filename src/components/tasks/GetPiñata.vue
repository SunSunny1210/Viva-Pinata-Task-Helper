<script setup>
import { usePiñataStore } from '@/stores/store';
import { onMounted } from 'vue';

const emit = defineEmits(['selected-piñata'])

const piñataStore = usePiñataStore();

onMounted(async () => {
    await piñataStore.fetchPiñatas()
})
</script>

<template>
    <div class="get-piñatas">
        <div class="choose-piñata">
            <h3>Choose your Piñata</h3>
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
            display: flex;
            flex-direction: column;
            background-color: var(--background-yellow);
            border-radius: 12px;

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
                justify-content: space-between;
                align-items: center;
                gap: 10px;
                
                img {
                    height: 100px;
                    width: 110px;
                    border: 3px dashed orange;
                    border-radius: 12px;
                    flex: 5;
                }
                
                span {
                    padding: 10px;
                    width: fit-content;
                    text-align: center;
                    color: var(--dark-green);
                    background-color: cornsilk;
                    border-radius: 12px;
                    flex: 5;
                }
            }
        }
    }

    @media screen and (min-width: 700px) {
        img {
            min-height: 120px;
            max-width: 130px;
        }
    }
</style>