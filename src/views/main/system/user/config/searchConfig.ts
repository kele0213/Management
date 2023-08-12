import type { IFormConfig } from '@/base-ui/form'
const formConfig: IFormConfig = {
  labelWidth: '100px',
  styleLayout: {
    padding: '10px 20px'
  },
  itemLayout: {
    xl: 8,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  },
  formItems: [
    {
      field: 'id', //v-model绑定字段
      type: 'input',
      label: 'ID',
      placeholder: '请输入ID'
    },
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'enable',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { label: '正常', value: '1' },
        { label: '异常', value: '0' }
      ]
    },
    {
      field: 'createAt',
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
