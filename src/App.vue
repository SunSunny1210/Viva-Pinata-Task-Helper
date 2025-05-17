<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import NavBar from './components/NavBar.vue';
import { RouterView, RouterLink } from 'vue-router';
import { useProfileStore, useUserStore } from './stores/store';

const storeUser = useUserStore();
const storeProfile = useProfileStore();
const menuOpen = ref(false);

const affectMenu = (value) => {
  menuOpen.value = value
}

const closeMenu = (event) => {
  const navBtn = document.querySelector('.menu-btn button')
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
  </div>
</template>

<style scoped>
  .main {
    height: 100%;
    width: 100%;
    transition: transform 0.3s ease-in-out;
    overflow: visible;
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }

  .router-view {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 17vh;
  }

  .moveRight {
    transform: translateX(70%);
  }

  @media screen and (min-width: 700px){
    .router-view {
      margin-top: 8rem;
      padding: 1rem;
      height: 90vh;
    }

    .moveRight {
      transform: translateX(40%);
    }
  }
</style>
