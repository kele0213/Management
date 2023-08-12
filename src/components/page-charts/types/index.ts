export interface IDataType {
  value: any
  name: string
}

export interface IMapData {
  name: string
  value: number
}
export interface IToolTipData {
  name: string
  value: IMapData[]
}
