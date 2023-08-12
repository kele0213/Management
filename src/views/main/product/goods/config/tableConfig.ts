import type { ITableType } from '@/base-ui/table/types'
const tableConfig: ITableType = {
  isShowIndex: true,
  isShowSelect: true,
  title: '商品列表',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '100' },
    { prop: 'oldPrice', label: '原价', minWidth: '60' },
    { prop: 'newPrice', label: '现价', minWidth: '60' },
    { prop: 'imgUrl', label: '图片', minWidth: '100', slotName: 'image' },
    {
      prop: 'status',
      label: '商品状态',
      minWidth: '100',
      slotName: 'status'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createTime'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateTime'
    },
    {
      label: '操作',
      minWidth: '130',
      slotName: 'handler'
    }
  ]
}

export default tableConfig
