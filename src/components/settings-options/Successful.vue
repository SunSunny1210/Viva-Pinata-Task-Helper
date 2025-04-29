<script setup>
const props = defineProps({
    option: String
})
</script>

<template>
    <div class="successful">
        <h2>{{ props.option }} successful!</h2>
    </div>
</template>

<style scoped>
</style>