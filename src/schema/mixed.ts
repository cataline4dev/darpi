import { currentConfig as config } from '../configure'
import typeOf from '../helpers/typeOf'
import { Validation, Formatting, Exception } from '../models/Schema'

// schemas
import StringSchema from './string'
import NumberSchema from './number'

type Specialize<C extends MixedSchema<any>, T> = C extends NumberSchema<any>
  ? NumberSchema<Extract<T, number | undefined>>
  : C extends StringSchema<any>
  ? StringSchema<Extract<T, string | undefined>>
  : MixedSchema<T>

export default class MixedSchema<T> {
  type!: T
  readonly validations: Validation[] = []
  readonly formattings: Formatting[] = []
  readonly exceptions: Exception[] = []

  required(message?: string): Specialize<this, Exclude<T, undefined>> {
    this.validations.push({
      name: 'required',
      message: message || config.messages.mixed.required,
      test: (value: any) => {
        return typeOf(value) === 'empty' ? false : true
      }
    })

    return this as any
  }

  oneOf<U extends T>(
    arrayOfValues: U[],
    message?: string
  ): Specialize<this, U | undefined> {
    type Params = { arrayOfValues: any[] }

    this.validations.push({
      name: 'oneOf',
      params: { arrayOfValues },
      message: message || config.messages.mixed.oneOf,
      test: (value: any, params: Params) => {
        const toCompare = typeOf(value) === 'number' ? Number(value) : value

        return params.arrayOfValues.includes(toCompare)
      }
    })

    return this as any
  }

  toDefault(value: any) {
    this.exceptions.push({
      name: 'toDefault',
      data: { value }
    })

    return this
  }

  confirmed(reference: string, message?: string) {
    type Params = {
      reference: string
      allFields: {
        [key: string]: any
      }
    }

    this.validations.push({
      name: 'confirmed',
      params: { reference },
      message: message || config.messages.mixed.confirmed,
      test: (value: any, params: Params) => {
        const { reference, allFields } = params

        if (allFields[reference] === undefined) {
          console.error('wrong reference for confirmation')

          return false
        }

        return value === allFields[reference]
      }
    })

    return this
  }

  equal(value: any, message?: string) {
    type Params = {
      value: any
    }

    this.validations.push({
      name: 'equal',
      params: { value },
      message: message || config.messages.mixed.equal,
      test: (value: any, params: Params) => {
        return value === params.value
      }
    })

    return this
  }
}
