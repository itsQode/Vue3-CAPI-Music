import { createRouter, createWebHistory } from 'vue-router'

import useUserStore from '@/stores/user'

const Home = () => import('@/views/HomeView.vue')
const Manage = () => import('@/views/ManageView.vue')
const Song = () => import('@/views/SongView.vue')

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    name: 'manage',
    // alias: '/manage',
    path: '/manage-music',
    component: Manage,
    beforeEnter(to, from, next) {
      next()
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage',
    redirect: { name: 'manage' }
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

export default router

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    return next()
  }

  const store = useUserStore()
  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})