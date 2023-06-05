import type {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'

export interface Iinterceptors<T = AxiosResponse> {
  requestSuccessInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestErrorInterceptor?: (err: any) => any
  responseSuccessInterceptor?: (res: T) => T
  responseErrorInterceptor?: (err: any) => any
}

export interface IZxAxios<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: Iinterceptors<T>
  isLoading?: boolean
}
