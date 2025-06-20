<script setup>
import { useProfileStore } from '@/stores/store';
import { ref } from 'vue';

const props = defineProps({
    option: String
})

const emits = defineEmits(['open-successful', 'open-unsuccessful'])

const newUserName = ref('');
const newFarmName = ref('');

const profileStore = useProfileStore();

const handleInputChange = (event) => {
    if (props.option === 'Change Username') {
    newUserName.value = event.target.value;
    } else if (props.option === 'Change Farm Name') {
    newFarmName.value = event.target.value;
    }
};

const trimmedOption = props.option.replace(/(?:Change |Check\/Change )/, "")

const handleSubmit = async (option) => {
    console.log(`Submitting for option: ${option}`);
    let columnName = option === "Change Username" ? "username" : "farm_name";
    let newValue = option === "Change Username" ? newUserName.value : newFarmName.value;
    
    if (newValue) {
        profileStore.updateProfileData(columnName, newValue)

        emits('open-successful')
    } else {
        emits('open-unsuccessful')
    }
}
</script>

<template>
    <div class="pop-up">
        <h2>{{ props.option }}</h2>
        <div class="change-option">
            <h3>Choose new {{ trimmedOption }}</h3>
            <div class="info">
                <p>Choose your new {{ trimmedOption }} :3</p>
                <form class="change-info" @submit.prevent="handleSubmit(props.option)">
                    <label :for="trimmedOption">New {{ trimmedOption }}</label>
                    <input 
                    type="text" 
                    :name="props.option === 'Change Username' ? 'username' : 'farm_name'" 
                    :id="trimmedOption"
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
        top: 20vh;
        height: 60%;
        width: 80%;
        background-color: cornsilk;
        border-radius: 12px;
        z-index: 10;
        overflow-y: scroll;

        h2 {
            position: fixed;
            margin: 0;
            height: 60px;
            width: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            background-color: var(--medium-green);
            border-radius: 12px 12px 0 0;
            z-index: 3;
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
            margin-top: 3.5rem;
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
                    margin-bottom: 1rem;
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

    @media screen and (min-width: 700px) {
        .pop-up {
            height: 70%;
            overflow-y: scroll;
        }
    }

    @media screen and (min-width: 750px) {
        .pop-up {
            height: fit-content;

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
            width: 50%;
            overflow-y: visible;

            h2 {
                width: 50%;
            }
        }
    }
</style>