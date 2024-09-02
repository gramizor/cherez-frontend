const dateFormatter = (dateString: string, isWithTime: boolean = false): string => {
  const date = new Date(dateString)

  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const year = date.getUTCFullYear()

  const formattedDate = `${day}.${month}.${year}`

  if (isWithTime) {
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')
    return `${formattedDate} ${hours}:${minutes}`
  }

  return formattedDate
}

export const calculateDaysUntil = (targetDate: string | undefined): number => {
  if (!targetDate) return 0

  const now = new Date()
  const target = new Date(targetDate)
  const differenceInTime = target.getTime() - now.getTime()
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))

  return differenceInDays
}

export const getMonthDifference = (startedAt: Date, endsAt: Date): number => {
  const yearsDifference = endsAt.getFullYear() - startedAt.getFullYear()
  const monthsDifference = endsAt.getMonth() - startedAt.getMonth()

  return yearsDifference * 12 + monthsDifference
}

export const getDaysUntilNextMonth = (endsDate: Date): number => {
  const nextMonthDate = new Date(endsDate)
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1)

  const currentDate = new Date()
  const timeDifference = nextMonthDate.getTime() - currentDate.getTime()
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  return daysDifference
}

export default dateFormatter
