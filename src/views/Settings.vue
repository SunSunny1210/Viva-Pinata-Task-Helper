<script setup>
import ChangeAvatar from '@/components/settings-options/ChangeAvatar.vue';
import ChangeEmailPassword from '@/components/settings-options/ChangeEmailPassword.vue';
import ChangeNames from '@/components/settings-options/ChangeNames.vue';
import CheckInbox from '@/components/settings-options/CheckInbox.vue';
import Setting from '@/components/settings-options/Setting.vue';
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

    const openMessage = ref(false);
    const selectedOption = ref(null);

    const showOption = (option) => {
        selectedOption.value = option;
    }

    const closePopUp = (event) => {
        if (selectedOption.value && 
        !event.target.closest(".pop-up") && 
        !event.target.closest(".clickable")) {
            selectedOption.value = null;
        }
    };

    const handleClose = () => {
        selectedOption.value = null;
        openMessage.value = true;
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
        <ChangeNames v-if="selectedOption && selectedOption !== OPTIONS.CHANGE_OPTIONS.AVATAR" :option="selectedOption"/>
    </Transition>
    <Transition name="fade">
        <ChangeEmailPassword v-if="selectedOption === OPTIONS.USER_OPTIONS.EMAIL || 
        selectedOption === OPTIONS.USER_OPTIONS.PASSWORD"
        :option="selectedOption"
        @close-pop-up="handleClose"/>
    </Transition>
    <Transition name="fade">
        <CheckInbox v-if="openMessage" />
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