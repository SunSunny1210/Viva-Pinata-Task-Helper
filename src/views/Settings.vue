<script setup>
import ChangeAvatar from '@/components/settings-options/ChangeAvatar.vue';
import { ref, onMounted, onUnmounted } from 'vue';

    const CHANGE_OPTIONS = {
    USERNAME: 'Change Username',
    AVATAR: 'Change Avatar',
    FARM_NAME: 'Change Farm Name'
    }

    const options = Object.keys(CHANGE_OPTIONS).map(key => CHANGE_OPTIONS[key]);

    const selectedOption = ref(null)

    const showOption = (option) => {
        if (option === CHANGE_OPTIONS.AVATAR) {
            selectedOption.value = option
        } else {
            selectedOption.value = null
        }
    }

    const closePopUp = (event) => {
        if (selectedOption.value && !event.target.closest(".pop-up") && !event.target.closest(".clickable")) {
            selectedOption.value = null;
        }
    };

    onMounted (() => {
        document.addEventListener("click", closePopUp);

    });

    onUnmounted (() => {
        document.removeEventListener("click", closePopUp)
    })
</script>

<template>
  <div class="settings">
    <h1>Settings</h1>
    <div class="setting">
        <h2>Profile</h2>
        <div class="options">
            <span v-for="option in options" :key="option" class="clickable" @click="showOption(option)">
            {{ option }}    
        </span>
        </div>
    </div>
    <Transition name="fade">
        <ChangeAvatar v-if="selectedOption === CHANGE_OPTIONS.AVATAR"/>
    </Transition>
  </div>
</template>

<style>
    * {
        margin: 0;
    }
    .settings {
        margin-top: 2rem;
        margin: 1rem;
        height: 90vh;
        width: 80vw;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: white;
        border: 3px outset var(--background-yellow);
        border-radius: 12px;
        
        h1 {
            height: 10vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            background-color: var(--medium-green);
            border-radius: 5px 5px 0 0; 
        }

        .setting {
            position: relative;
            width: 100%;

            h2 {
                position: relative;
                margin: 1rem 0 0 2rem;
                padding: 0.5rem;
                width: fit-content;
                color: white;
                background-color: var(--main-green);
                border-radius: 12px;
                z-index: 2;
            }

            .options {
                margin: 0 1rem;
                padding: 2rem 1rem 1rem 1rem;
                width: 220px;
                position: absolute;
                top: 2.5rem;
                left: 0;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                gap: 10px;
                text-align: start;
                font-size: 1.2rem;
                color: var(--dark-green);
                background-color: white;
                border: 3px dashed var(--light-green);
                border-radius: 12px;
            }
            
            span {
                padding: 10px;
                background-color: var(--white-yellow);
                border: 3px dashed var(--carmin);
                border-radius: 5px;
            }

            span:hover,
            span:active {
                background-color: darkgreen;
                color: white;
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.2s ease, transform 0.5s ease;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
        transform: scale(0.8);
    }
</style>