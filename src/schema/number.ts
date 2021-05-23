import { currentConfig as config } from '../configure'
import MixedSchema from './mixed'

export default class NumberSchema<T extends number | undefined> extends MixedSchema<T> {
  constructor() {
    super()

    this.isNumber()
    this.toNumber()
  }

  isNumber() {
    this.validations.push({
      name: 'isNumber',
      message: config.messages.number.isNumber,
      test: (value: any) => {
        return !isNaN(value)
      }
    })
  }

  toNumber() {
    this.formattings.push({
      name: 'toNumber',
      format: (value: string) => {
        return Number(value)
      }
    })
  }

  min(min: number, message?: string) {
    type Params = { min: number }

    this.validations.push({
      name: 'min',
      params: { min },
      message: message || config.messages.number.min,
      test: (value: number, params: Params) => {
        return value >= params.min
      }
    })

    return this
  }

  max(max: number, message?: string) {
    type Params = { max: number }

    this.validations.push({
      name: 'max',
      params: { max },
      message: message || config.messages.number.max,
      test: (value: number, params: Params) => {
        return value <= params.max
      }
    })

    return this
  }

  positive(message?: string) {
    this.validations.push({
      name: 'positive',
      message: message || config.messages.number.positive,
      test: (value: number) => {
        return value > 0
      }
    })

    return this
  }

  negative(message?: string) {
    this.validations.push({
      name: 'negative',
      message: message || config.messages.number.negative,
      test: (value: number) => {
        return value < 0
      }
    })

    return this
  }

  between(min: number, max: number, message?: string) {
    type Params = {
      min: number
      max: number
    }

    this.validations.push({
      name: 'between',
      params: { min, max },
      message: message || config.messages.number.between,
      test: (value: number, params: Params) => {
        return value >= params.min && value <= params.max
      }
    })

    return this
  }

  round(type: 'toUp' | 'toDown' | 'closer') {
    type Params = {
      type: 'toUp' | 'toDown' | 'closer'
    }

    this.formattings.push({
      name: 'round',
      params: { type },
      format: (value: number, params: Params) => {
        const { type } = params

        if (type === 'toDown') return Math.floor(value)
        if (type === 'toUp') return Math.ceil(value)
        if (type === 'closer') return Math.round(value)
      }
    })

    return this
  }
}
