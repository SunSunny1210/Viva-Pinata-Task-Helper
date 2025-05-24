<script setup>
import { useAwardStore } from '@/stores/award-store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const awardsStore = useAwardStore();

const { awardsData } = storeToRefs(awardsStore);

const props = defineProps({
    piñata: String
})
</script>

<template>
    <div class="awards">
        <table>
            <tr>
                <th>Visit</th>
                <th>Residence</th>
                <th>Romance</th>
                <th>Master Romancer</th>
                <th>Variant 1</th>
                <th>Variant 2</th>
                <th>Variant 3</th>
            </tr>
            <tr v-if="awardsData.piñata === props.piñata">
                <td v-if="awardsData.visit">
                    <img src="../../assets/images/Visit.png" />
                </td>
                <td v-if="awardsData.residence">
                    <img src="../../assets/images/Residence.png" />
                </td>
                <td v-if="awardsData.romance">
                    <img src="../../assets/images/Romance.png" />
                </td>
                <td v-if="awardsData.master_romancer">
                    <img src="../../assets/images/Master_Romancer.png" />
                </td>
                <td v-if="awardsData.variant_1">
                    <img src="../../assets/images/Residence.png" />
                </td>
                <td v-if="awardsData.variant_2">
                    <img src="../../assets/images/Residence.png" />
                </td>
                <td v-if="awardsData.variant_3">
                    <img src="../../assets/images/Residence.png" />
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
</style>