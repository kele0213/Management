import ILoginType from './login/type'
import { ISystemType } from './system/types'
import IAnalysisType from './analysis/type'

export default interface IRootType {
  name: string
  entryDepartment: any[]
  entryRole: any[]
  entryMenu: any[]
}

export interface IRootWithModule {
  login: ILoginType
  system: ISystemType
  analysis: IAnalysisType
}

export type IRoot = IRootType & IRootWithModule
