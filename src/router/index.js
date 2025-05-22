import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterUser from '@/views/RegisterUser.vue'
import LoginUser from '@/views/LoginUser.vue'
import { defineAsyncComponent } from 'vue'
import { useUserStore } from '@/stores/store'
import Piñatas from '@/views/Piñatas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterUser,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginUser,
    },
    {
      path: '/create-profile',
      name: 'create-profile',
      component: () => import('@/views/CreateProfile.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings.vue'),
    },
    {
      path: '/pinatas',
      name: 'pinatas',
      component: Piñatas
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.userData) {
      await userStore.initializeUserData();
  }

  next();
});


export default router