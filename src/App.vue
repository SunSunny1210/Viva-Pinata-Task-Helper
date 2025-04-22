<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import NavBar from './components/NavBar.vue';
import { RouterView, RouterLink } from 'vue-router';
import { useUserStore } from './stores/store';
import { getUser } from './api/supabase/piñatasAPI';

const storeUser = useUserStore();
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
  const userData = await getUser();

  if (userData) {
    console.log(userData)
    storeUser.setUserData(userData)
  } else {
    console.log("No active session.")
  }
  
  document.addEventListener('click', closeMenu);
});

onUnmounted(() => {
  document.removeEventListener('click', closeMenu);
});
</script>

<template>
  <div class="main" :class="{ moveRight: menuOpen }">
    <NavBar :menuOpen="menuOpen" @menuToggled="affectMenu" @closeMenu="affectMenu(false)"/>
    <div class="router-view">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
  .main {
    width: 100%;
    transition: transform 0.3s ease-in-out;
    overflow: visible;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .router-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 17vh;
  }

  .moveRight {
    transform: translateX(70%);
  }
</style>
