<script setup>
import AsideMenu from '@/components/AsideMenu.vue'
import VPLogo from '@/assets/images/VivaPinataTIP.png';
import Pretzail from '@/assets/images/pretzail.jpg';

const props = defineProps({
    menuOpen: Boolean,
});

const emit = defineEmits(['menuToggled', 'closeMenu'])

const toggleMenu = () => {
    emit('menuToggled', !props.menuOpen)
}
</script>

<template>
    <nav>
        <div class="menu-btn">
            <span><</span>
            <img :src="Pretzail" @click="toggleMenu"></img>
        </div>
        <img class="logo" :src=VPLogo />
    </nav>
    <AsideMenu :isOpen="menuOpen" @closeMenu="$emit('closeMenu')" />
</template>

<style scoped>
    nav {
        height: 17vh;
        width: 100%;
        position: fixed;
        top: 0;
        background-color: var(--main-green);
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 5;
        
        .logo {
            margin-right: 1.5rem;
            height: 80%;
        }
        
        .menu-btn {
            padding: 0.5rem;
            height: 70%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            background-color: var(--medium-green);
            border-radius: 0 12% 12% 0;
            font-size: 2rem;
            color: white;

            img {
                height: 100%;
                width: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                border: 3px solid yellow;
                border-radius: 12%;
                flex: 1;
            }
        }
    }

    @media screen and (min-width: 1020px) {
    }
</style>