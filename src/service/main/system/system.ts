import zxRequest from '../..'
import { IDate } from '@/service/types'

export function getPageListData(url: string, queryInfo: any) {
  return zxRequest.post<IDate>({
    url: url,
    data: queryInfo,
    isLoading: false
  })
}

export function deletePageData(url: string) {
  return zxRequest.delete<IDate>({
    url: url,
    isLoading: false
  })
}

export function createPageData(url: string, newData: any) {
  return zxRequest.post<IDate>({
    url: url,
    data: newData,
    isLoading: false
  })
}

export function updatePageData(url: string, newData: any) {
  return zxRequest.patch<IDate>({
    url: url,
    data: newData,
    isLoading: false
  })
}
