import type { ITableType } from '@/base-ui/table/types'
const tableConfig: ITableType = {
  isShowIndex: true,
  isShowSelect: true,
  title: '角色列表',
  propList: [
    { prop: 'name', label: '角色名称', minWidth: '100' },
    { prop: 'intro', label: '角色权限', minWidth: '100' },
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
