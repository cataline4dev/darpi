import { Schema } from '../models/Schema'

export default (schema: Schema, values: Record<string, any>) => {
  const formattedValues = { ...values }

  Object.keys(schema).forEach((field) => {
    schema[field].formattings.forEach((formatting) => {
      const { params, format } = formatting

      formattedValues[field] = format(values[field], params)
    })
  })

  return formattedValues
}
