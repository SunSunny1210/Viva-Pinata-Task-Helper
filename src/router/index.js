import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterUser from '@/views/RegisterUser.vue'
import LoginUser from '@/views/LoginUser.vue'
import CreateProfile from '@/views/CreateProfile.vue'
import { defineAsyncComponent } from 'vue'

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
      component: defineAsyncComponent(() => import('@/views/CreateProfile.vue')),
    },
  ],
})

export default router