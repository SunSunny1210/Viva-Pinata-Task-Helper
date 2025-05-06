<script setup>
import { useUserStore, useProfileStore } from '@/stores/store';
import { nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';
import CheckInbox from './settings-options/CheckInbox.vue';
import Unsuccessful from './settings-options/Unsuccessful.vue';

const props = defineProps({
    parentType: {
        type: String,
        required: true
    }
})

const router = useRouter();
const storeUser = useUserStore();
const storeProfile = useProfileStore();

const email = ref('');
const password = ref('');
const option = ref('');
const showMessage = ref(false);
const showUnsuccessful = ref(false);

const closeMessage = () => {
    showUnsuccessful.value = !showUnsuccessful.value
}

const sendUserData = async () => {
    try {
        console.log(password.value)

        if (props.parentType === "Register") {
            const checking = await storeUser.registerUser(email.value, password.value);
            console.log(checking)
            
            if (checking.includes('successfully')) {
                showMessage.value = !showMessage.value;
                
                nextTick(() => {
                    if (!showMessage.value) {
                        router.push('/create-profile');
                    }
                });
                
            } else if (checking.includes('Password should') || checking.includes('valid password')) {
                option.value = 'Password';
                showUnsuccessful.value = !showUnsuccessful.value;
                console.log(showUnsuccessful.value)
            } else if (checking.includes('Email' && 'invalid') || checking.includes('Anonymous')) {
                option.value = 'Email'
                showUnsuccessful.value = !showUnsuccessful.value;
            };
        };

        if (props.parentType === "Login") {
            const checking = await storeUser.loginUser(email.value, password.value);

            if (checking) {
                await storeProfile.getProfileData();
                router.push('/');
            };
        };

    } catch (err) {
        console.error(err)
    }
}
</script>

<template>
    <div class="form">
        <form @submit.prevent="sendUserData">
            <label for="email">Email</label>
            <input v-model="email" type="email" id="email" name="email" placeholder="Enter your email" />
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password" name="password" placeholder="Password must be...">
            <button type="submit">Submit</button>
        </form>
    </div>
    <Transition name="fade">
        <CheckInbox v-if="showMessage" :parent-type="'Userform'" />
    </Transition>
    <Transition name="fade">
        <Unsuccessful v-if="showUnsuccessful" :register-option="option" :option="'Register'" @close-message="closeMessage"/>
    </Transition>
</template>

<style scoped>
    .form {
        width: 100%;

        form {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            
            label {
                margin: 1rem;
                color: var(--dark-green);
                font-size: 1.2rem;
            }
            
            input {
                padding-left: 1rem;
                height: 3rem;
                width: 80%;
                border: 3px dotted orange;
                border-radius: 5px;
            }

            ::placeholder {
                color: darkolivegreen;
                font-size: 1rem;
            }

            button {
                margin: 1rem 0;
                height: 4rem;
                width: 80%;
                color: white;
                font-size: 1rem;
                background-color: var(--carmin);
                border: none;
                border-radius: 12px;
            }
        }
    }
</style>