import type { App } from 'vue'
import localCache from '@/utils/localCache'
import { registerProperties } from './RegeistProperties'
export function globalRegeist(app: App): void {
  registerProperties(app)
}
