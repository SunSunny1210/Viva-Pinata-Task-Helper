<script setup>
import { useUserStore } from '@/stores/store';
import { ref } from 'vue';

const props = defineProps({
    option: String
})

const emit = defineEmits(['close-pop-up'])

const userStore = useUserStore();

const trimmedOption = props.option.replace(/(?:Change |Check\/Change )/, "");
const newEmail = ref('');
const newPassword = ref('');

console.log(props.option)

const handleInputChange = (event) => {
    if (props.option === 'Check/Change Email') {
    newEmail.value = event.target.value;
    } else if (props.option === 'Check/Change Password') {
    newPassword.value = event.target.value;
    }
};

const handleSubmit = async (option) => {
    console.log(`Submitting for option: ${option}`);
    let newValue = option === "Check/Change Email" ? newEmail.value : newPassword.value;
    
    userStore.updateUserData(newValue);

    emit('close-pop-up');
}
</script>

<template>
    <div class="pop-up">
        <h2>{{ props.option }}</h2>
        <div v-if="props.option === 'Check/Change Email'" class="check-option">
            <h3>Check {{ trimmedOption }}</h3>
            <div class="info">
                <p>Check your current {{ trimmedOption }}</p>
                <span>Current {{ trimmedOption }}: {{ userStore.userData.user.email }}</span>
            </div>
        </div>
        <div class="change-option">
            <h3>Choose New {{ trimmedOption }}</h3>
            <div class="info">
                <p>Choose your new {{ trimmedOption }} :3</p>
                <form class="change-info" @submit.prevent="handleSubmit(props.option)">
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
</template>

<style scoped>
.pop-up {
    position: fixed;
    height: 60%;
    width: 80%;
    background-color: cornsilk;
    border-radius: 12px;
    box-shadow: 0 0 5px 2000px rgba(0, 0, 0, 0.4);
    z-index: 7;
    overflow-y: scroll;

    h2 {
        margin: 0;
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background-color: var(--medium-green);
        border-radius: 12px 12px 0 0;
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
        margin: 0 1rem 2rem;
        padding: 2rem 1rem 1rem 1rem;
        width: 220px;
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

    p {
        padding: 10px;
        text-align: center;
        background-color: var(--white-yellow);
        border: 3px dashed var(--carmin);
        border-radius: 5px;
    }

    .change-option {
        height: 100%;
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
</style>