export default (a: object, b: object) => {
  const aKeys = Object.keys(a).sort()
  const bKeys = Object.keys(b).sort()

  return JSON.stringify(aKeys) === JSON.stringify(bKeys)
}
