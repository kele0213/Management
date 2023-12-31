import type { IFormConfig } from '@/base-ui/form'
const modalFormConfig: IFormConfig = {
  labelWidth: '80px',
  styleLayout: {},
  itemLayout: {
    span: 24
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ]
}
export default modalFormConfig
