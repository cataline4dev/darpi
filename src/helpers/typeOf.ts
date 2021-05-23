export default (value: any) => {
  if ([null, undefined, ''].includes(value)) return 'empty'

  if (value.constructor.name === 'Object') return 'object'

  if (value.constructor.name === 'Array') return 'array'

  if (value.constructor.name === 'boolean') return 'boolean'

  if (!isNaN(value) && !isNaN(parseFloat(value))) return 'number'

  return 'string'
}
