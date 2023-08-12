import { createRouter, createWebHashHistory } from 'vue-router'
import localCache from '@/utils/localCache'
import type { RouteRecordRaw } from 'vue-router'
import { firstRoute } from '@/utils/mapMenus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathmatch(.*)',
    name: 'notfound',
    component: () => import('@/views/not-found/notFound.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return firstRoute.path
  }
})

export default router
