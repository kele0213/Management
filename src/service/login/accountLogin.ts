import zxRequest from '@/service'
import type { IAccount, ILogin, ILoginData } from './loginType'

enum URL {
  LOGIN = '/login', //登录
  USER = '/users/', // /users/id 查询用户信息
  MENU = '/role/' // /role/1/menu 查询用户菜单
}

export function accountLoginRequest(account: IAccount) {
  return zxRequest.post<ILogin<ILoginData>>({
    url: URL.LOGIN,
    data: {
      name: account.username,
      password: account.password
    }
  })
}

export function userInfoRequest(id: number) {
  return zxRequest.get<ILogin>({
    url: URL.USER + id,
    isLoading: false
  })
}

export function menuRequest(id: number) {
  return zxRequest.get<ILogin>({
    url: URL.MENU + id + '/menu',
    isLoading: false
  })
}
