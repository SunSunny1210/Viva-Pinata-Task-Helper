<script setup>
import { useAwardStore } from '@/stores/award-store';
import { ref, watch } from 'vue';

const awardsStore = useAwardStore();

const props = defineProps({
    piñata: String,
    awards: Array
})

const currentAward = ref(null);

props.awards.forEach(award => {
    if (award.piñata === props.piñata) {
        currentAward.value = award
    }
})

watch(() => awardsStore.awardsData, (newValue) => {
    if (newValue.length > 0) {
        console.log(props.awards)
    }
}, { immediate: true })
</script>

<template>
    <div class="awards">
        <table>
            <tr>
                <th class="start">Visit</th>
                <th class="middle">Residence</th>
                <th class="middle">Romance</th>
                <th class="middle">Master Romancer</th>
                <th class="middle">Variant 1</th>
                <th class="middle">Variant 2</th>
                <th class="end">Variant 3</th>
            </tr>
            <tr>
                <td v-if="currentAward?.visit" class="first">
                    <img src="../../assets/images/Visit.png" />
                </td>
                <td v-else-if="!currentAward?.visit" class="first">X</td>
                <td v-if="currentAward?.residence" class="mid">
                    <img src="../../assets/images/Residence.png" />
                </td>
                <td v-if="!currentAward?.residence" class="mid">X</td>
                <td v-if="currentAward?.romance" class="mid">
                    <img src="../../assets/images/Romance.png" />
                </td>
                <td v-if="!currentAward?.romance" class="mid">X</td>
                <td v-if="currentAward?.master_romancer" class="mid">
                    <img src="../../assets/images/Master_Romancer.png" />
                </td>
                <td v-if="!currentAward?.master_romancer" class="mid">X</td>
                <td v-if="currentAward?.variant_1" class="mid">
                    <img src="../../assets/images/Residence.png" />
                </td>
                <td v-if="!currentAward?.variant_1" class="mid">X</td>
                <td v-if="currentAward?.variant_2" class="mid">
                    <img src="../../assets/images/Residence.png" />
                </td>
                <td v-if="!currentAward?.variant_2" class="mid">X</td>
                <td v-if="currentAward?.variant_3" class="last">
                    <img src="../../assets/images/Residence.png" />
                </td>
                <td v-if="!currentAward?.variant_3" class="last">X</td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
    .awards {
        margin-top: 1rem;
        width: 100%;
        table {
            padding: 10px;
            display: flex;

            tr {
                flex: 2;
            }
            
            th {
                height: 4rem;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                background-color: orange;
                
            }
            
            td {
                height: 4rem;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                background-color: rgba(255, 179, 38, 0.525);
                
                img {
                    height: 4rem;
                }
            }

            .start {
                border-radius: 12px 0 0 0;
                border-bottom: 3px dashed white;
            }

            .end {
                border-radius: 0 0 0 12px;
            }

            .middle {
                border-bottom: 3px dashed white;
            }

            .first {
                border-top: 3px dashed orange;
                border-right: 3px dashed orange;
                border-bottom: 3px dashed orange;
                border-radius: 0 12px 0 0;
            }
            
            .mid {
                border-right: 3px dashed orange;
                border-bottom: 3px dashed orange;
            }
            
            .last {
                border-radius: 0 0 12px 0;
                border-right: 3px dashed orange;
                border-bottom: 3px dashed orange;
            }
        }
    }
</style>