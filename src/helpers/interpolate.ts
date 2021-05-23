export default (rawMessage: string, data: Record<string, any>) => {
  return rawMessage.replace(/\{(\w+)\}/g, (_match, expr) => {
    return data[expr]
  })
}
