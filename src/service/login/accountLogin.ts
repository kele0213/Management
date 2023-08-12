import zxRequest from '@/service'
import type { IAccount, ILoginData } from './loginType'
import type { IDate } from '../types'

enum URL {
  LOGIN = '/login', //登录
  USER = '/users/', // /users/id 查询用户信息
  MENU = '/role/' // /role/1/menu 查询用户菜单
}

export function accountLoginRequest(account: IAccount) {
  return zxRequest.post<IDate<ILoginData>>({
    url: URL.LOGIN,
    data: {
      name: account.username,
      password: account.password
    }
  })
}

export function userInfoRequest(id: number) {
  return zxRequest.get<IDate>({
    url: URL.USER + id,
    isLoading: false
  })
}

export function menuRequest(id: number) {
  return zxRequest.get<IDate>({
    url: URL.MENU + id + '/menu',
    isLoading: false
  })
}
