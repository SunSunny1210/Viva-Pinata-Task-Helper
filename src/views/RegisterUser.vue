<script setup>
import UserForm from '@/components/UserForm.vue';

</script>

<template>
    <div class="register">
        <h1>Register your user!</h1>
        <p>Enter your email and password to create your user. Remember to make a safe password!</p>
        <UserForm :parentType="'Register'" />
    </div>
</template>

<style scoped>
    * {
        margin: 0;
    }
    .register {
        margin: 1rem;
        height: 100%;
        width: 85%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
            font-size: 1.5rem;
            color: white;
            background-color: var(--medium-green);
            border-radius: 5px 5px 0 0; 
        }

        p {
            margin: 1rem 1rem 0 1rem;
            padding: 2rem;
            text-align: justify;
            font-size: 1.2rem;
            color: var(--dark-green);
            background-color: rgb(255, 251, 167);
            border: 3px dashed var(--carmin);
            border-radius: 12px;
        }
    }

    @media screen and (min-width: 750px) {
        .register {
            p {
                margin: 2rem 2rem 0;
                font-size: 1.5rem;
            }
        }
    }
</style>