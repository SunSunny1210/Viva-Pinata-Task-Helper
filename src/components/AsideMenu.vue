<script setup>
import { RouterLink } from 'vue-router';
// import UserData from '@/components/UserData';

const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(['closeMenu']);
</script>

<template>
    <!-- <UserData /> -->
     <div>
        <aside>
            <RouterLink to="">Home</RouterLink>
            <RouterLink to="">Piñatas</RouterLink>
            <RouterLink to="">Villagers</RouterLink>
            <RouterLink to="">Plants and seeds</RouterLink>
            <RouterLink to="">Services</RouterLink>
        </aside>
     </div>
</template>

<style scoped>
    aside {
        position: fixed;
        top: 0;
        left: 0;
        width: 50%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: var(--background-yellow);
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
    }
</style>