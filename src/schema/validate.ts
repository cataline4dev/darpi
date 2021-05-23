import { Schema } from '../models/Schema'
import { Error } from '../models/Error'
import interpolate from '../helpers/interpolate'
import typeOf from '../helpers/typeOf'

export default (schema: Schema, values: Record<string, any>) => {
  const errors: Error[] = []

  Object.keys(schema).map((field) => {
    const isEmpty = typeOf(values[field]) === 'empty'

    const notRequired = !schema[field].validations.some(({ name }) => {
      return name === 'required'
    })

    if (isEmpty && notRequired) return

    schema[field].validations.forEach((validation) => {
      const { name, message, params, test } = validation

      if (!test(values[field], { ...params, allFields: values })) {
        errors.push({
          validation: name,
          field: field,
          message: interpolate(message, { field, ...params })
        })
      }
    })
  })

  return errors
}
