import { isAfter } from 'date-fns'

const checkLargeAd = (date: string) => {
  if (!date) return false
  return isAfter(new Date(date), new Date())
}

export default checkLargeAd
