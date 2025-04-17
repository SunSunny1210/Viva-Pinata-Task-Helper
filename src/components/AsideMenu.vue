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
        <aside :class="{ isOpen: isOpen }">
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
        padding: 1rem 10px 0 0;
        position: fixed;
        top: 0;
        left: 0;
        width: 65%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        background-color: var(--background-yellow);
        transform: translateX(-100%);
        transition: transform 0.5s ease-in-out;
        transition: box-shadow 0.2s ease-out;

        a {
            height: 30px;
            width: 85%;
            display: flex;
            align-items: center;
            padding: 7px;
            color: white;
            background-color: var(--main-green);
            text-decoration: none;
            border-radius: 5px;
        }
    }

    .isOpen {
        box-shadow: 150px 0 200px -50px rgba(0, 0, 0, 0.7);
    }
</style>