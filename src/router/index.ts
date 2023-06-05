import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/view/main/main.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
