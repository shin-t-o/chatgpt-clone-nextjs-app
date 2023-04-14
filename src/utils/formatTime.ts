import { Timestamp } from 'firebase/firestore'

export const formatTime = (date: Timestamp) => {
  if (!date) return ''
  const convDate = date.toDate()
  return makeDate(convDate) == makeDate(new Date())
    ? makeTime(convDate)
    : `${makeDate(convDate)} ${makeTime(convDate)}`
}

const makeDate = (date: Date) => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month.toString()}/${day.toString()}`
}

const makeTime = (date: Date) => {
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`
}
