export const parseTimeAndDate = (isoDate) => {
  const date = new Date(isoDate)
  const time = `${date.getHours()}:${String(date.getMinutes()).padStart(
    2,
    "0"
  )}`
  const dateStr = `${String(date.getDate()).padStart(2, "0")}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${date.getFullYear()}`
  return [time, dateStr]
}
