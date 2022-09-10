// TODO: refactor
export function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] // 要素を入れ替えます
  }
  return array
}

// TODO: refactor
export function shuffleWithFirst<T>(array: T[], first: T) {
  const shuffled = shuffle(array).filter((x) => x !== first)
  return [first, ...shuffled]
}

export function isEqualArray<T>(x: T[], y: T[]) {
  if (!Array.isArray(x)) return false
  if (!Array.isArray(y)) return false
  if (x.length != y.length) return false
  for (let i = 0, n = x.length; i < n; ++i) {
    if (x[i] !== y[i]) return false
  }
  return true
}
