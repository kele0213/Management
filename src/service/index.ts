import ZxRequest from './request/zxRequest'
import { BASE_URL, TIMEOUT } from './request/config'
import localCache from '@/utils/localCache'

const zxRequest = new ZxRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessInterceptor(config) {
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = token
      }
      // console.log('单个实例——成功请求拦截')
      return config
    },
    requestErrorInterceptor(err) {
      // console.log('单个实例——失败请求拦截')
      return err
    },
    responseSuccessInterceptor(res) {
      // console.log('单个实例——获取成功拦截')
      return res
    },
    responseErrorInterceptor(err) {
      // console.log('单个实例——获取失败拦截')
      return err
    }
  }
})

export default zxRequest
