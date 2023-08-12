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
      label: '用户账号',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'password',
      label: '用户密码',
      placeholder: '请输入密码',
      isHidden: true
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
      label: '用户状态',
      placeholder: '请选择状态',
      options: [
        {
          label: '正常',
          value: '1'
        },
        {
          label: '异常',
          value: '0'
        }
      ]
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '用户部门',
      placeholder: '请选择部门',
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      label: '用户角色',
      placeholder: '请选择角色',
      options: []
    }
  ]
}
export default modalFormConfig
