import { App } from 'vue'
import { formatUTC } from '@/utils/formatTime'

export function registerProperties(app: App) {
  app.config.globalProperties.$filter = {
    formatUTCtoTime(time: string) {
      return formatUTC(time)
    }
  }
}
