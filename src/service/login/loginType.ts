export interface IAccount {
  username: string
  password: string
}

export interface ILogin<T = any> {
  code: number
  data: T
}

export interface ILoginData {
  id: number
  name: string
  token: string
}
