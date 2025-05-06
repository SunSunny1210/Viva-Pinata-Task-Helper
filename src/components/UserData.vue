<script setup>
import { storeToRefs } from 'pinia';
import { useProfileStore } from '@/stores/store';
import NoProfile from './user-data/NoProfile.vue';
import WithProfile from './user-data/WithProfile.vue';

const storeProfile = useProfileStore();
const { profileData } = storeToRefs(storeProfile);

</script>

<template>
    <WithProfile v-if="profileData" />
    <NoProfile v-else />
</template>

<style>
    
</style>