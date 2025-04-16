<script setup>
import VPLogo from '@/assets/VivaPinataTIP.png';
import Pretzail from '@/assets/pretzail.jpg'
import { ref } from 'vue';

</script>

<template>
    <header>
        <div class="menu-btn">
            <span><</span>
            <button :style="{ backgroundImage: `url(${Pretzail})` }"></button>
        </div>
        <img class="logo" :src=VPLogo />
    </header>
</template>

<style scoped>
    header {
        height: 17vh;
        background-color: var(--main-green);
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .logo {
            margin-right: 1.5rem;
            height: 80%;
            z-index: 1;
        }
        
        .menu-btn {
            height: 60%;
            width: 30%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--medium-green);
            border-radius: 0 12% 12% 0;
            font-size: 2rem;
            color: white;

            button {
                margin-left: 1rem;
                height: 80%;
                width: 60%;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                border: 3px solid yellow;
                border-radius: 12%;
            }
        }
    }
</style>