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
            <div class="aside-settings">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="">Piñatas</RouterLink>
                <RouterLink to="">Villagers</RouterLink>
                <RouterLink to="">Plants and seeds</RouterLink>
                <RouterLink to="">Services</RouterLink>
                <RouterLink to="/settings" v-if="storeProfile.profileData">Settings</RouterLink>
            </div>
        </aside>
    </div>
</template>

<style scoped>
    aside {
        position: fixed;
        top: 0;
        left: 0;
        width: 70%;
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

    @media screen and (min-width: 700px) {
        aside {
            width: 40%;
            display: block;
            overflow-y: scroll;
            
            .aside-settings {
                padding: 1rem;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;

                a {
                    height: 40px;
                    width: 100%;
                }
            }
        }
    }
</style>