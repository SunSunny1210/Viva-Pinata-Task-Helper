<script setup>
import GetPiñata from './GetPiñata.vue';

const emit = defineEmits(['selected-piñata'])

const props = defineProps({
    task: Object
})
</script>

<template>
    <div class="task">
        <h2>{{ props.task.title }}</h2>
        <GetPiñata v-if="props.task.title === 'Get Piñata'" @selected-piñata="$emit('selected-piñata', $event)"/>
    </div>
</template>

<style scoped>
</style>