<script setup>
import UserForm from '@/components/UserForm.vue';

</script>

<template>
    <div class="login">
        <h1>Log in!</h1>
        <p>Enter your email and password to log in. Remember your password!</p>
        <UserForm :parentType="'Login'"/>
    </div>
</template>

<style scoped>
    .login {
        margin: 1rem 1rem 4rem;
        height: 100%;
        width: 85%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        border-radius: 12px;
        
        h1 {
            margin: 0;
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
            margin: 1rem;
            padding: 2rem;
            text-align: justify;
            font-size: 1.2rem;
            color: var(--dark-green);
            background-color: rgb(255, 251, 167);
            border: 3px dashed var(--carmin);
            border-radius: 12px;
        }
    }

    @media screen and (min-width: 700px) {
        .login {
            overflow-y: scroll;

            h1 {
                position: fixed;
                width: 85%;
            }
        }
    }

    @media screen and (min-width: 750px) {
        .login {
            height: 75vh;
            
            p {
                margin: 14vh 2rem 0;
                font-size: 1.5rem;
            }
        }
    }

    @media screen and (min-width: 1020px) {
        .login {
            height: 75vh;
            display: block;

            h1 {
                position: fixed;
                height: 10vh;
                width: 85vw;
            }
        }
    }

    @media screen and (min-height: 350px) and (max-height: 700px) and (max-width: 749px) {
        .login {
            margin-bottom: 3rem;
        }
    }

    @media screen and (min-height: 451px) and (max-height: 700px) and (min-width: 750px) {
        .login {
            margin-bottom: 5rem;
        }
    }
</style>