import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterUser from '@/views/RegisterUser.vue'
import LoginUser from '@/views/LoginUser.vue'
import { useProfileStore, useUserStore } from '@/stores/store'
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
      beforeEnter: async (to, from, next) => {
        const userStore = useUserStore();
        const loginCheck = await userStore.checkUserLog();

        if (loginCheck) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginUser,
      beforeEnter: async (to, from, next) => {
        const userStore = useUserStore();
        const loginCheck = await userStore.checkUserLog();

        if (loginCheck) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/create-profile',
      name: 'create-profile',
      component: () => import('@/views/CreateProfile.vue'),
      beforeEnter: async (to, from, next) => {
        const userStore = useUserStore();
        const profileStore = useProfileStore();
        const profileCheck = await profileStore.checkProfileExistence();
        const userCheck = await userStore.checkUserLog();

        if (profileCheck && userCheck) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings.vue'),
      beforeEnter: async (to, from, next) => {
        const userStore = useUserStore();
        const loginCheck = await userStore.checkUserLog();

        if (loginCheck) {
          next('/')
        } else {
          next()
        }
      }
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