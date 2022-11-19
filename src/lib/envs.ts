export function required<T>(variable: T | undefined): T {
  if (variable === null || variable === undefined) {
    console.error('cannot found')
    process.exit(1)
  }
  return variable
}
