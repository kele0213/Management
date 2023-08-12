import type { IFormConfig } from '@/base-ui/form'
const formConfig: IFormConfig = {
  labelWidth: '100px',
  styleLayout: {
    padding: '10px 20px'
  },
  formItems: [
    {
      field: 'name', //v-model绑定字段
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限名称',
      placeholder: '请输入权限名称'
    },
    {
      field: 'createTime',
      type: 'dataPicker',
      label: '创建时间',
      others: {
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        type: 'daterange'
      }
      // placeholder: '请输入用户名'
    }
  ]
}
export default formConfig
