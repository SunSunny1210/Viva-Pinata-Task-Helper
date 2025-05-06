<script setup>
import { RouterLink } from 'vue-router';
import UserData from '@/components/UserData.vue';
import { useProfileStore } from '@/stores/store';

const storeProfile = useProfileStore();

const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(['closeMenu']);

const handleLinkClick = (event) => {
    if (event.target.closest('a')) {
        emit('closeMenu');
    }
};
</script>

<template>
    <div>
        <aside :class="{ isOpen: isOpen }" @click="handleLinkClick">
            <UserData />
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="">Piñatas</RouterLink>
            <RouterLink to="">Villagers</RouterLink>
            <RouterLink to="">Plants and seeds</RouterLink>
            <RouterLink to="">Services</RouterLink>
            <RouterLink to="/settings" v-if="storeProfile.profileData">Settings</RouterLink>
        </aside>
    </div>
</template>

<style scoped>
    aside {
        padding: 1rem 10px 0 0;
        position: fixed;
        top: -17px;
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
        z-index: 6;

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