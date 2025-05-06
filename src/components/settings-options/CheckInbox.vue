<script setup>
const props = defineProps({
    parentType: String
})

const reloadPage = async () => {
    try {
        if ('caches' in window) {
            const cachesNames = await caches.keys();
            for (const cacheName of cachesNames) {
                await caches.delete(cacheName)
            }
        }

        if (props.parentType === 'Setting') {
            window.location.href = '/'
        } else {
            window.location.href = '/create-profile'
        }
    } catch (err) {
        console.error(err)
    }
}
</script>

<template>
    <div class="check-inbox">
        <h3>Check your Inbox</h3>
        <p>Check your inbox to confirm email <span v-if="parentType === 'Setting'" class="change">change</span>. The email should arrive within the next minutes. Remember to check your spam in case you don't see it.</p>
        <span>If you've already confirmed it, click on the button below to reload the page.</span>
        <button @click="reloadPage">Reload</button>
    </div>
</template>

<style scoped>
.check-inbox {
    position: fixed;
    top: 20vh;
    height: 60%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: cornsilk;
    border-radius: 12px;
    box-shadow: 0 0 5px 2000px rgba(0, 0, 0, 0.4);
    z-index: 7;
    overflow-y: scroll;

    h3 {
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

    p {
        margin: 1rem;
        padding: 10px;
        text-align: center;
        background-color: var(--white-yellow);
        border: 3px dashed var(--carmin);
        border-radius: 5px;
    }

    span {
        margin: 1rem;
        font-size: 1rem;
        text-align: center;
        color: var(--dark-green);
        border-radius: 12px;
    }

    .change {
        margin: 0;
        color: black;
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
</style>