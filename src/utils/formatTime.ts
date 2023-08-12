const FORMAT_DATA = 'YYYY-MM-DD hh:mm:ss'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function formatUTC(time: string, format: string = FORMAT_DATA) {
  return dayjs.utc(time).utcOffset(8).format(format) // 东八区
}
