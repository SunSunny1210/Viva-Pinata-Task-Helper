<script setup>
import Pretzail from '@/assets/images/pretzail.jpg';
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="no-profile">
        <img :src="Pretzail" alt="Cute Pretzail">
        <div class="options">
            <RouterLink to="/register">Register</RouterLink>
            <RouterLink to="/login">Login</RouterLink>
        </div>
    </div>
</template>

<style scoped>
    .no-profile {
        margin: 1rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--medium-green);

        .no-profile {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
        }

        img {
            height: 70%;
            width: 100%;
            border-radius: 12px;
            border: 5px dashed  yellow;
        }

        .options {
            margin-left: 10px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 15px;
            
            a {
                font-size: clamp(1.2rem, 4vw, 1.3rem);
                text-decoration: underline wavy yellow;
                color: white;
            }
        }
    }
</style>