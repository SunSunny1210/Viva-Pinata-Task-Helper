<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import NavBar from './components/NavBar.vue';
import { RouterView } from 'vue-router';
import { useProfileStore, useUserStore } from './stores/store';

const storeUser = useUserStore();
const storeProfile = useProfileStore();
const menuOpen = ref(false);

const affectMenu = (value) => {
  menuOpen.value = value
}

const closeMenu = (event) => {
  const navBtn = document.querySelector('.menu-btn img')
  if (menuOpen.value && !event.target.closest('aside') && !navBtn.contains(event.target)) {
    menuOpen.value = false
  }
};

onMounted(async () => {
  await storeUser.initializeUserData();
  await storeProfile.getProfileData();
  
  document.addEventListener('click', closeMenu);
});

onUnmounted(() => {
  document.removeEventListener('click', closeMenu);
});
</script>

<template>
  <div class="main" :class="{ moveRight: menuOpen }">
    <Transition name="fade">
      <div v-if="menuOpen" class="shadow"></div>
    </Transition>
    <NavBar :menuOpen="menuOpen" @menuToggled="affectMenu" @closeMenu="affectMenu(false)"/>
    <div class="router-view">
      <RouterView />
    </div>
    <div class="background"> </div>
    <div class="filter"> </div>
  </div>
</template>

<style scoped>
  .main {
    height: 100%;
    width: 100%;
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .shadow {
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9;
  }

  .background {
    position: fixed;
    height: 100vh;
    width: 100vw;
    background: url(./assets/images/background.jpg);
    filter: blur(2px);
    z-index: -2;
  }

  .filter {
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(255, 247, 195, 0.345);
    z-index: -1;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }

  .router-view {
    height: calc(100vh - 110px);
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 110px;
    overflow-y: hidden;
  }

  .moveRight {
    transform: translateX(70%);
  }

  @media screen and (min-width: 700px) and (max-width: 1020px){
    .moveRight {
      transform: translateX(40%);
    }
  }

  @media screen and (min-width: 1020px) {
    .moveRight {
      transform: translateX(20%);
    }
  }

  @media screen and (min-height: 350px) and (max-height: 415px) {
    .moveRight {
      transform: translateX(40%);
    }
  }

  @media screen and (min-height: 700px) and (min-height: 1350px) and (max-width: 1500px) {
    .moveRight {
      transform: translateX(40%);
    }
  }
</style>
