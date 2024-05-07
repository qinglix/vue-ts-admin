import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatUTCDate(utcString: string, format: string = 'YYYY-MM-DD HH:mm:ss') {
  // const formatted = dayjs.utc(utcString).format('YYYY-MM-DD HH:mm:ss')
  const formatted = dayjs.utc(utcString).utcOffset(8).format(format)
  return formatted
}
