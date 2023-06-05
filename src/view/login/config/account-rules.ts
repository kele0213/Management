export const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
    {
      pattern: /[a-z0-9]{5,10}$/,
      message: '用户名只能为5-10位的大小写和数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /[a-z0-9]{5,}$/,
      message: '密码为5位以上的大小写和数字',
      trigger: 'blur'
    }
  ]
}
