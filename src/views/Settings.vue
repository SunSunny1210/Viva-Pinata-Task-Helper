<script setup>
import ChangeAvatar from '@/components/settings-options/ChangeAvatar.vue';
import ChangeEmailPassword from '@/components/settings-options/ChangeEmailPassword.vue';
import ChangeNames from '@/components/settings-options/ChangeNames.vue';
import LogOutDeleteUser from '@/components/settings-options/LogOutDeleteUser.vue';
import Setting from '@/components/settings-options/Setting.vue';
import Successful from '@/components/settings-options/Successful.vue';
import Unsuccessful from '@/components/settings-options/Unsuccessful.vue';
import { ref, onMounted, onUnmounted } from 'vue';

    const OPTIONS = {
        CHANGE_OPTIONS: {
            TITLE: 'Profile',
            USERNAME: 'Change Username',
            AVATAR: 'Change Avatar',
            FARM_NAME: 'Change Farm Name'
        },
        USER_OPTIONS: {
            TITLE: 'User',
            EMAIL: 'Check/Change Email',
            PASSWORD: 'Check/Change Password',
            SESSION: 'Log Out',
            DELETE: 'Delete User'
        }
    }

    const options = Object.values(OPTIONS);

    const openSuccessful = ref(false);
    const openUnsuccessful = ref(false);
    const selectedOption = ref(null);
    
    const showOption = (option) => {
        selectedOption.value = option;
        console.log(selectedOption.value)
    }

    const closePopUp = (event) => {
        if (selectedOption.value && 
        !event.target.closest(".pop-up") && 
        !event.target.closest(".clickable") &&
        !event.target.closest(".unsuccessful")) {
            selectedOption.value = null;
        }
    };

    const handleClose = () => {
        selectedOption.value = null;
    }

    const manageMessages = () => {
        openMessage.value = !openMessage.value;
    }

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
    <Setting v-for="(options, key) in OPTIONS" :key="key" @trigger-function="showOption" :options="options"/>
    <Transition name="fade">
        <ChangeAvatar v-if="selectedOption === OPTIONS.CHANGE_OPTIONS.AVATAR"/>
    </Transition>
    <Transition name="fade">
        <ChangeNames v-if="selectedOption === OPTIONS.CHANGE_OPTIONS.USERNAME || 
        selectedOption === OPTIONS.CHANGE_OPTIONS.FARM_NAME" 
        :option="selectedOption"/>
    </Transition>
    <Transition name="fade">
        <ChangeEmailPassword v-if="selectedOption === OPTIONS.USER_OPTIONS.EMAIL || 
        selectedOption === OPTIONS.USER_OPTIONS.PASSWORD"
        :option="selectedOption"
        @close-pop-up="handleClose"
        @open-message="manageMessages"/>
    </Transition>
    <Transition name="fade">
        <Successful v-if="openSuccessful" />
    </Transition>
    <Transition name="fade">
        <Unsuccessful v-if="openUnsuccessful"
        :option="selectedOption"
        @close-message="manageMessages" />
    </Transition>
    <Transition name="fade">
        <LogOutDeleteUser v-if="selectedOption === OPTIONS.USER_OPTIONS.DELETE || 
        selectedOption === OPTIONS.USER_OPTIONS.SESSION"
        :option="selectedOption"
        @close-pop-up="handleClose" />
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
        overflow-y: scroll;
        
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
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.2s ease, transform 0.5s ease;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
        transform: scale(0.8);
    }
</style>