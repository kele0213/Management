import zxRequest from '..'
import { IDate } from '../types'

enum GOODS {
  TYPE = '/goods/category/count',
  SALE = '/goods/category/sale',
  FAVOR = '/goods/category/favor',
  ADDRESS = '/goods/address/sale'
}

export function getGoodsTypeCount() {
  return zxRequest.get<IDate>({
    url: GOODS.TYPE,
    isLoading: false
  })
}
export function getGoodsSaleCount() {
  return zxRequest.get<IDate>({
    url: GOODS.SALE,
    isLoading: false
  })
}
export function getGoodsFavorCount() {
  return zxRequest.get<IDate>({
    url: GOODS.FAVOR,
    isLoading: false
  })
}
export function getGoodsAddressSale() {
  return zxRequest.get<IDate>({
    url: GOODS.ADDRESS,
    isLoading: false
  })
}
