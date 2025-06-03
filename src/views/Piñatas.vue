<script setup>
import Awards from '@/components/tasks/Awards.vue';
import { useAwardStore } from '@/stores/award-store';
import { usePiñataStore, useUserStore } from '@/stores/store';
import { onMounted, ref } from 'vue';

const piñatasStore = usePiñataStore();
const userStore = useUserStore();
const awardsStore = useAwardStore();

const showAward = ref(false)

onMounted(async () => {
    await piñatasStore.fetchPiñatas();
    console.log(piñatasStore.piñatas);
    await awardsStore.getAwards();
    console.log(awardsStore.awardsData);
    showAward.value = true
})
</script>

<template>
    <div class="piñatas">
        <h1>Piñatas</h1>
        <div v-for="(piñata, i) in piñatasStore.piñatas" :key="piñata.id" class="piñata">
            <h2>{{ piñata.name }}</h2>
            <div class="piñata-info">
                <img :src="piñata.img_URL">
                <Awards v-if="userStore.userData && showAward" :piñata="piñata.name" :awards="awardsStore.awardsData" />
                <div class="information">
                    <h3>Requirements</h3>
                    <div class="info-container">
                        <ul class="info-content">
                            <h4>Appear</h4>
                            <li v-for="appear in piñata.requirements.appear" :key="appear">{{ appear }}</li>
                            <p v-if="!piñata.requirements.appear.length">No existent requirements.</p>
                        </ul>
                        <ul class="info-content">
                            <h4>Visit</h4>
                            <li v-for="visit in piñata.requirements.visit" :key="visit">{{ visit }}</li>
                            <p v-if="!piñata.requirements.visit.length">No existent requirements.</p>
                        </ul>
                        <ul class="info-content">
                            <h4>Residence</h4>
                            <li v-for="residence in piñata.requirements.resident" :key="residence">{{ residence }}</li>
                            <p v-if="!piñata.requirements.resident.length">No existent requirements.</p>
                        </ul>
                    </div>
                </div>
                <div class="information">
                    <h3>Variants</h3>
                    <div class="info-container">
                        <ul v-for="(info, color) in piñata.variants" :key="color" class="info-content">
                            <h4>{{ color.replace(/^./, a => a.toUpperCase()) }}</h4>
                            <li>{{ info.requirement }}</li>
                            <img v-if="info.variant_img" :src="info.variant_img" />
                        </ul>
                    </div>
                </div>
                <div class="information">
                    <h3>Conflicts</h3>
                    <div class="info-container">
                        <ul v-for="(info, conflict) in piñata.conflicts" :key="conflict" class="info-content">
                            <h4>{{ conflict.replace(/_/g, ' ').replace(/^./, a => a.toUpperCase()) }}</h4>
                            <li v-for="subject in info">{{ subject }}</li>
                            <p v-if="!info.length">No conflicts.</p>
                        </ul>
                    </div>
                </div>
                <div class="information">
                    <h3>Uses</h3>
                    <ul class="uses">
                        <li v-for="use in piñata.uses">{{ use }}</li>
                        <p v-if="!piñata.uses.length">No existent uses.</p>
                    </ul>
                </div>
                <div class="information">
                    <h3>Tips</h3>
                    <div class="info-container">
                        <ul v-for="(info, tip) in piñata.tips" :key="tip" class="info-content">
                            <h4>{{ tip.replace(/^./, a => a.toUpperCase()) }}</h4>
                            <p v-if="!info.length">No known tips.</p>
                            <li v-else v-for="t in info">{{ t }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .piñatas {
        margin: 1rem 0;
        width: 90vw;
        background-color: var(--light-green);
        border-radius: 12px;
        overflow-y: scroll;
        
        h1,
        h2,
        h3,
        h4 {
            margin: 0;
        }
        
        h1 {
            padding: 1rem;
            color: white;
            background-color: var(--medium-green);
            border-radius: 12px 12px 0 0;
        }
        
        .piñata {
            padding: 1rem;
            
            h2 {
                padding: 10px;
                color: white;
                background-color: var(--dark-green);
                border-radius: 12px 12px 0 0;
            }
            
            .piñata-info {
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: cornsilk;
                
                img {
                    margin: 1rem 0 0 1rem;
                    height: 15vh;
                    width: 15vh;
                    border: 3px dashed orange;
                    border-radius: 12px;
                }
                
                .information {
                    position: relative;
                    width: 100%;

                    h3 {
                        position: absolute;
                        top: 19px;
                        left: 10px;
                        padding: 8px;
                        width: fit-content;
                        color: white;
                        background-color: var(--main-green);
                        border-radius: 12px 12px 0 0;
                    }

                    .uses {
                        li {
                            margin-left: 1.5rem;
                        }

                        li::marker {
                            color: var(--carmin);
                        }
                    }

                    .info-container,
                    .uses {
                        margin-top: 3.5rem;
                        padding: 2rem 8px 1rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: center;
                        gap: 2rem;
                        border: 3px dashed var(--light-green);
                        border-radius: 12px;

                        .info-content {
                            padding: 1.5rem 8px 1.5rem 2rem;
                            position: relative;
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            gap: 8px;
                            border: 3px dashed var(--carmin);
                            border-radius: 12px;

                            h4 {
                                padding: 8px;
                                position: absolute;
                                top: -25px;
                                left: 10px;
                                color: white;
                                background-color: var(--carmin);
                                border-radius: 12px;
                            }

                            li::marker {
                                color: var(--carmin);
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (min-width: 1020px) {
    }
</style>