<script setup>
import { useUserStore } from '@/stores/store';
import { ref } from 'vue';
import CheckInbox from './CheckInbox.vue';

const props = defineProps({
    option: String
})

const emit = defineEmits(['close-pop-up', 'open-unsuccessful']);
const openMessage = ref(false)

const userStore = useUserStore();

const trimmedOption = props.option.replace(/(?:Change |Check\/Change )/, "");
const newEmail = ref('');
const newPassword = ref('');

const manageMessage = () => {
    openMessage.value = !openMessage.value
    console.log(openMessage.value)
}

const handleInputChange = (event) => {
    if (props.option === 'Check/Change Email') {
    newEmail.value = event.target.value;
    } else if (props.option === 'Check/Change Password') {
    newPassword.value = event.target.value;
    }
};

const handleSubmit = async () => {
    try {
        console.log(`Submitting for option: ${props.option}`);
        let newValue = props.option === "Check/Change Email" ? newEmail.value : newPassword.value;
        
        if (newValue) {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue);

            if (isValid) {
                const check = await userStore.checkEmail(newValue, userStore.userId);

                if (check) {
                    emit('open-unsuccessful');

                } else {
                    await userStore.updateUserData(newValue);
            
                    manageMessage();
                }

            } else {
                emit('open-unsuccessful')
            }

        } else {
            emit('open-unsuccessful')
        }

    } catch {
        console.error(err);
        emit('open-unsuccessful')
    }
}
</script>

<template>
    <div class="pop-up">
        <h2>{{ props.option }}</h2>
        <div class="all-options">
            <div v-if="props.option === 'Check/Change Email'" class="change-email">
                <h3>Check {{ trimmedOption }}</h3>
                <div class="info">
                    <p>Check your current {{ trimmedOption }}</p>
                    <span>Current {{ trimmedOption }}: {{ userStore.userData?.user?.email }}</span>
                </div>
            </div>
            <div class="change-option">
                <h3>Choose New {{ trimmedOption }}</h3>
                <div class="info">
                    <p>Choose your new {{ trimmedOption }} :3</p>
                    <form class="change-info" @submit.prevent="handleSubmit">
                        <label :for="trimmedOption">New {{ trimmedOption }}</label>
                        <input 
                        type="text" 
                        :name="props.option === 'Check/Change Email' ? 'email' : 'password'" 
                        :id="props.option === 'Check/Change Email' ? 'emailId' : 'passwordId'"
                        :placeholder="'Enter new ' + trimmedOption"
                        @input="handleInputChange">
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        <Transition name="appear">
            <CheckInbox v-if="openMessage" :email="newEmail" :parent-type="'Setting'" />
        </Transition>
    </div>
</template>

<style scoped>
.pop-up {
    position: fixed;
    top: 20vh;
    height: 60%;
    width: 80%;
    display: flex;
    flex-direction: column;
    background-color: cornsilk;
    border-radius: 12px;
    z-index: 10;
    overflow-y: scroll;

    h2 {
        margin: 0;
        position: fixed;
        height: 60px;
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        color: white;
        background-color: var(--medium-green);
        border-radius: 12px 12px 0 0;
        z-index: 3;
    }

    .all-options {
        margin-top: 3.5rem;
    }

    h3 {
        position: relative;
        top: 20px;
        margin: 0 2rem;
        padding: 0.5rem;
        width: fit-content;
        color: white;
        background-color: var(--main-green);
        border-radius: 12px;
        z-index: 2;
    }

    .info {
        margin: 0 1rem 1rem;
        padding: 2rem 1rem 1rem 1rem;
        height: fit-content;
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

    p {
        padding: 10px;
        text-align: center;
        background-color: var(--white-yellow);
        border: 3px dashed var(--carmin);
        border-radius: 5px;
    }

    .change-option {
        width: 100%;
        display: flex;
        flex-direction: column;

    
        form {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            
            label {
                margin: 1rem;
                font-size: 1.5rem;
                color: var(--dark-green);
                border-radius: 12px;
            }
    
            input {
                margin: 1rem;
                padding: 10px;
                height: 2rem;
                width: 80%;
                border: 3px dashed orange;
                border-radius: 5px;
            }
            
            ::placeholder {
                color: darkolivegreen;
            }
            
            button {
                margin-bottom: 2rem;
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
}

.appear-enter-active, .appear-leave-active {
        transition: opacity 0.2s ease, transform 0.5s ease;
    }

.appear-enter-from, .appear-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

@media screen and (min-width: 700px) {
    .pop-up {
        height: 70%;
    }
}

@media screen and (min-width: 750px) {
    .pop-up {

        .change-option {
            .info {
                form {
                    input {
                        height: 3.5rem;
                    }
                }
            }
        }
    }
}

@media screen and (min-width: 1020px) {
        .pop-up {
            left: 25vw;
            height: 60%;
            width: 50%;
            
            h2 {
                width: 50%;
            }
        }

        ::-webkit-scrollbar { 
            border-radius: 12px;
        }
    }
</style>