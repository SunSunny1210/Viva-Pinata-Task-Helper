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
        <aside @click="handleLinkClick">
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
        z-index: 10;

        .aside-settings {
            padding: 0 1rem;
            width: 100%;

            a {
                margin-bottom: 0.5rem;
                height: 30px;
                display: flex;
                align-items: center;
                padding: 7px;
                color: white;
                background-color: var(--main-green);
                text-decoration: none;
                border-radius: 5px;
            }
        }
    }

    @media screen and (min-width: 700px) {
        aside {
            width: 40%;
            display: block;
            overflow-y: scroll;
            transition: box-shadow 0.2s ease-in-out;
            
            .aside-settings {
                padding: 1rem;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;

                a {
                    padding: 10px;
                    height: 3rem;
                    width: 100%;
                    font-size: 1.5rem;
                }
            }
        }

        .isOpen {
            box-shadow: 200px 0 200px 500px rgba(0, 0, 0, 0.3);
        }
    }
</style>