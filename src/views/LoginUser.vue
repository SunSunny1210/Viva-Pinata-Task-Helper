<script setup>
import UserForm from '@/components/UserForm.vue';

</script>

<template>
    <div class="login">
        <h1>Log in!</h1>
        <p>Enter your email and password to log in. Remember your password!</p>
        <hr></hr>
        <UserForm :parentType="'Login'"/>
    </div>
</template>

<style scoped>
    * {
        margin: 0;
    }
    .login {
        margin-top: 2rem;
        margin: 1rem;
        width: 85%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
</style>