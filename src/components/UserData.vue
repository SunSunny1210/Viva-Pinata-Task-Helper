<script setup>
import { useProfileStore } from '@/stores/store';
import NoProfile from './user-data/NoProfile.vue';
import WithProfile from './user-data/WithProfile.vue';

const storeProfile = useProfileStore();
</script>

<template>
    <WithProfile v-if="storeProfile.profileData" />
    <NoProfile v-if="!storeProfile.profileData" />
</template>

<style>
    
</style>