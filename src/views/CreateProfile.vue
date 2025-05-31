<script setup>
import ProfileCreation from '@/components/ProfileCreation.vue';

</script>

<template>
    <div class="profile-creation">
        <h1>Create your profile!</h1>
        <p>Select your avatar, choose your username and give your farm a cool name!</p>
        <ProfileCreation />
    </div>
</template>

<style scoped>
    * {
        margin: 0;
    }
    .profile-creation {
        margin-top: 1rem;
        width: 85%;
        background-color: white;
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

    @media screen and (min-height: 350px) and (max-height: 450px) {
        .profile-creation {
            margin-bottom: 3rem;
        }
    }

    @media screen and (min-width: 700px) {
        .profile-creation {
            h1 {
                position: fixed;
                width: 85%;
            }

            p {
                margin-top: 15vh;
            }
        }
    }
</style>