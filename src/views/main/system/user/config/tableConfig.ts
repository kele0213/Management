import type { ITableType } from '@/base-ui/table/types'
const tableConfig: ITableType = {
  isShowIndex: true,
  isShowSelect: true,
  title: '用户列表',
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '真实姓名', minWidth: '100' },
    { prop: 'cellphone', label: '电话号码', minWidth: '100' },
    {
      prop: 'enable',
      label: '用户状态',
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
