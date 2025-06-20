<script setup>
import ChangeAvatar from '@/components/settings-options/ChangeAvatar.vue';
import ChangeEmailPassword from '@/components/settings-options/ChangeEmailPassword.vue';
import ChangeNames from '@/components/settings-options/ChangeNames.vue';
import ClosingX from '@/components/settings-options/ClosingX.vue';
import LogOut from '@/components/settings-options/LogOut.vue';
import PopUpShadow from '@/components/settings-options/PopUpShadow.vue';
import Setting from '@/components/settings-options/Setting.vue';
import Successful from '@/components/settings-options/Successful.vue';
import Unsuccessful from '@/components/settings-options/Unsuccessful.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
            SESSION: 'Log Out'
        }
    }

    const router = useRouter();

    const openSuccessful = ref(false);
    const openUnsuccessful = ref(false);
    const selectedOption = ref(null);
    
    const showOption = (option) => {
        selectedOption.value = option;
        console.log(selectedOption.value)
    }

    const closePopUp = () => {
        if (selectedOption.value) {
            selectedOption.value = null
        }
    };

    const manageSuccessful = () => {
        openSuccessful.value = !openSuccessful.value;

        if (!openSuccessful.value && (selectedOption.value === OPTIONS.USER_OPTIONS.DELETE || selectedOption.value === OPTIONS.USER_OPTIONS.SESSION)) {
            closePopUp();
            router.push('/');
        }
    }

    const manageUnsuccessful = () => {
        openUnsuccessful.value = !openUnsuccessful.value;
    }
</script>

<template>
  <div class="settings">
    <h1>Settings</h1>
    <div class="options">
        <Setting v-for="(options, key) in OPTIONS" :key="key" @trigger-function="showOption" :options="options"/>
    </div>
    <Transition name="x">
        <ClosingX v-if="selectedOption"
        :close="closePopUp"
        :successful="openSuccessful"
        :unsuccessful="openUnsuccessful"/>
    </Transition>
    <Transition name="fade">
        <PopUpShadow v-if="selectedOption" />
    </Transition>
    <Transition name="fade">
        <ChangeAvatar v-if="selectedOption === OPTIONS.CHANGE_OPTIONS.AVATAR"
        @open-successful="manageSuccessful"
        @open-unsuccessful="manageUnsuccessful" />
    </Transition>
    <Transition name="fade">
        <ChangeNames v-if="selectedOption === OPTIONS.CHANGE_OPTIONS.USERNAME || 
        selectedOption === OPTIONS.CHANGE_OPTIONS.FARM_NAME" 
        :option="selectedOption"
        @open-successful="manageSuccessful"
        @open-unsuccessful="manageUnsuccessful"/>
    </Transition>
    <Transition name="fade">
        <ChangeEmailPassword v-if="selectedOption === OPTIONS.USER_OPTIONS.EMAIL || 
        selectedOption === OPTIONS.USER_OPTIONS.PASSWORD"
        :option="selectedOption"
        @open-unsuccessful="manageUnsuccessful"/>
    </Transition>
    <Transition name="fade">
        <LogOut v-if="selectedOption === OPTIONS.USER_OPTIONS.DELETE || 
        selectedOption === OPTIONS.USER_OPTIONS.SESSION"
        :option="selectedOption"
        @open-successful="manageSuccessful"
        @open-unsuccessful="manageUnsuccessful" />
    </Transition>
    <Transition name="fade">
        <Successful v-if="openSuccessful"
        :option="selectedOption"
        @close-message="manageSuccessful" />
    </Transition>
    <Transition name="fade">
        <Unsuccessful v-if="openUnsuccessful"
        :option="selectedOption"
        @close-message="manageUnsuccessful" />
    </Transition>
  </div>
</template>

<style scoped>
    * {
        margin: 0;
    }
    
    .settings {
        margin: 1rem 0;
        height: 90vh;
        width: 80vw;
        background-color: white;
        border-radius: 12px;
        overflow-y: scroll;
        
        h1 {
            height: 73px;
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
        transition: opacity 0.2s ease-in-out
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }

    .x-enter-active {
        transition: opacity 0.3s ease-in-out
    }
    
    .x-leave-active {
        transition: opacity 0.1s ease
    }

    .x-enter-from, .x-leave-to {
        opacity: 0;
    }

    @media screen and (min-width: 1020px) {
        .settings {
            width: 90vw;

            h1 {
                position: fixed;
                width: 90vw;
                z-index: 3;
            }

            .options {
                margin-top: 4rem;
            }
        }
    }
</style>