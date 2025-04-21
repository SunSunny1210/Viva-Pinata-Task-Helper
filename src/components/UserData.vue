<script setup>
import { useUserStore } from '@/stores/store';
import { h } from 'vue';
import Pretzail from '@/assets/pretzail.jpg';
import { RouterLink } from 'vue-router';

const storeUser = useUserStore();

const printUserTemplate = () =>{
    return storeUser.profileData
    ? h("div", { class: "user-info" }, [
        h("img", { src: `${storeUser.profileData.avatar_url}` }),
        h("div", { class: "profile-names" }, [
            h("h3", { class: "username" }, storeUser.profileData.username),
            h("h4", { class: "farm-name" }, storeUser.profileData.farm_name)
        ])
    ])
    : h("div", { class: "no-user" }, [
        h("img", { src: `${Pretzail}` }),
        h("div", { class: "options" }, [
            h(RouterLink, { to: "/register" }, "Register"),
            h(RouterLink, { to: "/login" }, "Log in")
        ])
    ])
    
}
</script>

<template>
    <printUserTemplate />
</template>

<style>
    .no-user {
        height: 20%;
        width: 109%;
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
</style>