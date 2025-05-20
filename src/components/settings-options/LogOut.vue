<script setup>
import { useUserStore } from '@/stores/store';

const props = defineProps({
    option: String
})

const emit = defineEmits(['close-pop-up', 'open-successful', 'open-unsuccessful']);

const userStore = useUserStore();

const handleButton = async () => {
    try {
        if (props.option === "Log Out") {
            const check = await userStore.logOutUser();
            
            if (check) {
                emit('open-successful')
            } else {
                emit('open-unsuccessful')
            }

        } else {
            const check = await userStore.deleteUserData();
            
            if (check) {
                emit('open-successful')
            } else {
                emit('open-unsuccessful')
            }
            
        }
    } catch (err) {
        console.error(err)
    }
}
</script>

<template>
    <div class="pop-up">
        <h2>{{ props.option }}</h2>
        <div class="log-delete">
            <p>Are you sure you want to {{ props.option.toLocaleLowerCase() }}?</p>
            <button @click="handleButton">{{ props.option }}</button>
        </div>
    </div>
</template>

<style scoped>
.pop-up {
    position: fixed;
    top: 20vh;
    height: fit-content;
    width: 80%;
    display: flex;
    flex-direction: column;
    background-color: cornsilk;
    border-radius: 12px;
    z-index: 10;

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

    .log-delete {
        margin: 1rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        gap: 10px;
        text-align: start;
        font-size: 1.2rem;
        color: var(--dark-green);
        background-color: white;
        border: 3px dashed var(--light-green);
        border-radius: 12px;
        flex: 1;
    }

    button {
        height: 4rem;
        width: 80%;
        color: white;
        font-size: 1rem;
        background-color: var(--carmin);
        border: none;
        border-radius: 12px;
    }
    
    p {
        padding: 10px;
        text-align: center;
        background-color: var(--white-yellow);
        border: 3px dashed var(--carmin);
        border-radius: 5px;
    }
}

@media screen and (min-width: 750px) {
    .pop-up {
        height: 40%;
    }
}

@media screen and (min-width: 1020px) {
    .pop-up {
        left: 25%;
        width: 50%;
    }
}
</style>