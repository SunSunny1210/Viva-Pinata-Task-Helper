<script setup>
import Pretzail from '@/assets/pretzail.jpg';
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
        height: 20%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--medium-green);

        img {
            height: 100px;
            border-radius: 12px;
            border: 3px solid yellow;
        }

        .options {
            margin-left: 10px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 15px;
            align-items: flex-start;
            
            a {
                font-size: 1.5rem;
                text-decoration: underline wavy yellow;
                color: white;
            }
        }
    }

    @media screen and (min-width: 700px) {
        .no-profile {
            height: 10rem;
        }
    }
</style>