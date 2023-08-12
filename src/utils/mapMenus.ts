import type { RouteRecordRaw } from 'vue-router'
import type { IBreadItems } from '@/base-ui/breadCrumb'

let firstRoute: any = null

export function getRegisterRoute(menus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.获取所有路由
  const allroute: RouteRecordRaw[] = []
  require
    .context('../router/main', true, /\.ts/)
    .keys()
    .forEach((item) => {
      // 返回的item为url的相对路径，所以要做处理
      const value = require('../router/main' + item.split('.')[1]).default
      allroute.push(value)
    })
  // console.log(allroute)
  // 递归获取菜单路由
  const getRoutes = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1) {
        getRoutes(menu.children)
      } else {
        const route = allroute.find((route) => {
          return route.path === menu.url
        })
        if (route) {
          routes.push(route)
          if (!firstRoute) {
            firstRoute = route
          }
        }
      }
    }
  }
  getRoutes(menus)
  // console.log(routes)
  // 2. 递归获取对应路由
  return routes
}
export { firstRoute }

export function mapPathToBreadItems(menus: any[], path: string): IBreadItems[] {
  const items: IBreadItems[] = []
  mapPathToMenu(menus, path, items)

  return items
}

export function mapPathToMenu(
  menus: any[],
  path: string,
  breadItems?: IBreadItems[]
): any {
  for (const menu of menus) {
    if (menu.type === 1) {
      const item = mapPathToMenu(menu.children, path)
      if (item) {
        if (breadItems) {
          breadItems.push({ label: menu.name, url: '#' })
          breadItems.push({ label: item.name, url: '#' })
        }
        return item
      }
    } else if (menu.type === 2 && menu.url === path) {
      return menu
    }
  }
}

export function mapMenutoPermission(menus: any[]) {
  const permission: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else {
        permission.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(menus)
  return permission
}

export function mapMenuToLeaf(menus: any[]) {
  const leaves: number[] = []
  const _recurseGetLeaf = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leaves.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menus)
  return leaves
}
