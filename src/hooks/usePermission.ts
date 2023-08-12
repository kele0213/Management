import { useStore } from '@/store'
export default function (pageName: string, control: string) {
  const store = useStore()
  const permission = store.state.login.permission
  const allName = `system:${pageName}:${control}`
  return !!permission.find((value) => {
    return value === allName
  })
}
