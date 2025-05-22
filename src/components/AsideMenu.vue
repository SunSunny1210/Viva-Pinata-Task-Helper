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
            <div class="fixed">
                <UserData />
            </div>
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

        .fixed {
            height: 20vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--medium-green);
        }

        .aside-settings {
            margin-bottom: 1rem;
            padding: 0 1rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 1rem;
            overflow-y: scroll;

            a {
                height: 40px;
                display: flex;
                align-items: center;
                padding: 7px;
                font-size: clamp(1rem, 4vw, 1.2rem);
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
        }

        .isOpen {
            box-shadow: 200px 0 200px 500px rgba(0, 0, 0, 0.3);
        }
    }

    @media screen and (min-width: 1020px) {
        aside {
            width: 20vw;

            .aside-settings {
                overflow-y: auto;
            }
        }
    }

    @media screen and (min-height: 350px) and (max-height: 415px) {
        aside {
            width: 40%;

            .fixed {
                height: 40vh;
            }
        }
    }

    @media screen and (max-height: 435px) {
        aside {
            .fixed {
                height: 30vh;
            }
        }
    }

    @media screen and (min-height: 1020px) {
        aside {
            .aside-settings {
                overflow-y: auto;
            }
        }
    }

    @media screen and (min-height: 700px) and (max-width: 1500px) {
        aside {
            width: 40%;
        }
  }
</style>