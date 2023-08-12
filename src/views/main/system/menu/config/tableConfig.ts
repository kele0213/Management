import type { ITableType } from '@/base-ui/table/types'
const tableConfig: ITableType = {
  title: '角色菜单',
  isShowFooter: false,
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '150' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单地址', minWidth: '150' },
    { prop: 'icon', label: '菜单图标', minWidth: '150' },
    { prop: 'permission', label: '按钮权限', minWidth: '180' },
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
  ],
  childrenProps: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  }
}

export default tableConfig
