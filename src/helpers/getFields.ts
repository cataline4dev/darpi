import { Schema } from '../models/Schema'

export default (schema: Schema) => {
  const fields: Record<string, string> = {}

  Object.keys(schema).forEach((key) => {
    const toDefault = schema[key].exceptions.find((exception) => {
      return exception.name === 'toDefault'
    })

    fields[key] = toDefault ? toDefault.data!.value : ''
  })

  return fields
}
