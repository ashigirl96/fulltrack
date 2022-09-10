type TimeOptions = {
  hours?: number
  minutes?: number
  seconds?: number
}
export function timeToSeconds({
  hours = 0,
  minutes = 0,
  seconds = 0,
}: TimeOptions) {
  return hours * 3600 + minutes * 60 + seconds
}

export function secsToHMS(value: string | number) {
  const sec = typeof value === 'number' ? value : parseInt(value, 10)
  let hours = Math.floor(sec / 3600) // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60) // get minutes
  let seconds = sec - hours * 3600 - minutes * 60 //  get seconds
  return `${zero(hours)}:${zero(minutes)}:${zero(seconds)}`
}

export function secsToMS(value: string | number) {
  const sec = typeof value === 'number' ? value : parseInt(value, 10)
  let minutes = Math.floor(sec / 60) // get minutes
  let seconds = sec - minutes * 60 //  get seconds
  return `${zero(minutes)}:${zero(seconds)}`
}

function zero(num: number) {
  return num < 10 ? `0${num}` : num
}
