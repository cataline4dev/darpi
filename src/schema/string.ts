import { currentConfig as config } from '../configure'
import regexUrl from '../helpers/regexUrl'
import regexEmail from '../helpers/regexEmail'
import MixedSchema from './mixed'

export default class StringSchema<
  T extends string | undefined
> extends MixedSchema<T> {
  email(message?: string) {
    this.validations.push({
      name: 'email',
      message: message || config.messages.string.email,
      test: (value: string) => {
        return regexEmail.test(value)
      }
    })

    return this
  }

  url(message?: string) {
    this.validations.push({
      name: 'url',
      message: message || config.messages.string.url,
      test: (value: string) => {
        return regexUrl.test(value)
      }
    })

    return this
  }

  length(length: number, message?: string) {
    type Params = { length: number }

    this.validations.push({
      name: 'length',
      params: { length },
      message: message || config.messages.string.length,
      test: (value: string, { length }: Params) => {
        return value.length === length
      }
    })

    return this
  }

  maxLength(maxLength: number, message?: string) {
    type Params = { maxLength: number }

    this.validations.push({
      name: 'max',
      params: { maxLength },
      message: message || config.messages.string.maxLength,
      test: (value: string, { maxLength }: Params) => {
        return value.length <= maxLength
      }
    })

    return this
  }

  minLength(minLength: number, message?: string) {
    type Params = { minLength: number }

    this.validations.push({
      name: 'minLength',
      params: { minLength },
      message: message || config.messages.string.minLength,
      test: (value: string, { minLength }: Params) => {
        return value.length >= minLength
      }
    })

    return this
  }

  maxWords(maxWords: number, message?: string) {
    type Params = { maxWords: number }

    this.validations.push({
      name: 'maxWords',
      params: { maxWords },
      message: message || config.messages.string.maxWords,
      test: (value: string, { maxWords }: Params) => {
        const wordCount = value.trim().split(' ').length

        return wordCount <= maxWords
      }
    })

    return this
  }

  minWords(minWords: number, message?: string) {
    type Params = { minWords: number }

    this.validations.push({
      name: 'minWords',
      params: { minWords },
      message: message || config.messages.string.minWords,
      test: (value: string, { minWords }: Params) => {
        const wordCount = value.trim().split(' ').length

        return wordCount >= minWords
      }
    })

    return this
  }

  lowercase() {
    this.formattings.push({
      name: 'lowercase',
      format: (value: string) => {
        return value.toLocaleLowerCase()
      }
    })

    return this
  }

  uppercase() {
    this.formattings.push({
      name: 'uppercase',
      format: (value: string) => {
        return value.toUpperCase()
      }
    })

    return this
  }

  trim() {
    this.formattings.push({
      name: 'trim',
      format: (value: string) => {
        return value.trim()
      }
    })

    return this
  }

  first(letter: string, message?: string) {
    type Params = { letter: string }

    this.validations.push({
      name: 'first',
      params: { letter },
      message: message || config.messages.string.first,
      test: (value: string, params: Params) => {
        const firstLetter = value.trim().split('')[0]

        return firstLetter === params.letter
      }
    })

    return this
  }

  last(letter: string, message?: string) {
    type Params = { letter: string }

    this.validations.push({
      name: 'last',
      params: { letter },
      message: message || config.messages.string.last,
      test: (value: string, params: Params) => {
        const lastLetter = value.trim().split('').pop()

        return lastLetter === params.letter
      }
    })

    return this
  }
}
