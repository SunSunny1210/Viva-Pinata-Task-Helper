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
        border-radius: 12px;
        overflow-y: scroll;
        
        h1 {
            position: fixed;
            margin: 0;
            height: 10vh;
            width: 85%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            color: white;
            background-color: var(--medium-green);
            border-radius: 5px 5px 0 0;
        }

        p {
            margin: 11vh 1rem 0;
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
                margin: 14vh 2rem 0;
                font-size: 1.5rem;
            }
        }
    }

    @media screen and (min-width: 1020px) {
        .register {
            height: 75vh;
            display: block;

            h1 {
                position: fixed;
                height: 10vh;
            }
        }
    }

    @media screen and (min-height: 350px) and (max-height: 450px) {
        .register {
            margin-bottom: 3rem;
        }
    }
</style>