import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { Iinterceptors, IZxAxios } from './requestType'
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = true
export default class ZxRequest {
  instance: AxiosInstance
  interceptors?: Iinterceptors
  loading: any // Elloading的返回值axios源码里没有找到封装类型
  isLoading: boolean

  constructor(config: IZxAxios) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 加载中默认为true
    this.isLoading = config.isLoading ?? DEFAULT_LOADING
    // 每个实例对应的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestSuccessInterceptor,
      this.interceptors?.requestErrorInterceptor
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseSuccessInterceptor,
      this.interceptors?.responseErrorInterceptor
    )
    // 所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 加载中
        if (this.isLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载中...'
          })
        }
        // console.log('公共-请求成功拦截')
        return config
      },
      (err) => {
        // console.log('公共-请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('公共-获取成功拦截')
        const data = res.data
        // 关闭加载中,延迟两秒
        setTimeout(() => {
          this.loading?.close()
        }, 1000)

        // 服务器请求成功了，但请求的数据为空，实际请求失败
        // if (data.returnCode === 'FALSE') {
        //   console.log('请求失败')
        // }

        return data
      },
      (err) => {
        // console.log('公共-获取失败拦截')

        // 这里可以对40x 50x等错误信息进行拦截
        switch (err.response.status) {
          case '404':
            console.log('404错误')
            break
          default:
            break
        }

        return err
      }
    )
  }

  request<T>(config: IZxAxios<T>) {
    return new Promise<T>((resolve, reject) => {
      if (config.isLoading === false) {
        // 如果request传入false，则关闭该次请求的加载中
        this.isLoading = config.isLoading
      }
      // 单个请求对config的处理
      if (config.interceptors?.requestSuccessInterceptor) {
        config = config.interceptors.requestSuccessInterceptor(
          config as InternalAxiosRequestConfig
        )
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对接收数据的处理
          if (config.interceptors?.responseSuccessInterceptor) {
            res = config.interceptors.responseSuccessInterceptor(res)
          }
          // 将结果进行返回
          resolve(res)
          this.isLoading = DEFAULT_LOADING
        })
        .catch((err) => {
          // 将错误进行返回
          reject(err)
          this.isLoading = DEFAULT_LOADING
        })
    })
  }

  get<T>(config: IZxAxios<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: IZxAxios<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: IZxAxios<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: IZxAxios<T>): Promise<T> {
    return this.request({ ...config, method: 'patch' })
  }
}
