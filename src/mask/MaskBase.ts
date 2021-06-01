interface DataConstructor {
  inputType: string
  inputChar: string
  inputValue: string
  maskFormat: string
}

type CharType = ['special'] | ['text'] | ['numeric'] | ['text', 'numeric']
type TypeIsOptions = 'special' | 'text' | 'numeric'

interface Char {
  value: string
  type: CharType
  typeIs: (type: TypeIsOptions) => boolean
  typeMatches: (charType: CharType) => boolean
}

interface Input {
  fullText: string
  char: Char
}

interface Mask {
  format: string
  currentIndex: number
  char: Char
  nextChar: Char
  nextAlphanumericChar: {
    value?: string
    type: CharType
  }
}

interface Meta {
  inputType: string
  isFirstDigit: boolean
  isLastDigit: boolean
}

export default class BaseMask {
  input = {} as Input
  mask = {} as Mask
  meta = {} as Meta

  constructor(data: DataConstructor) {
    this.input = {
      fullText: data.inputValue,
      char: {
        value: data.inputChar,
        type: BaseMask.getCharType({ char: data.inputChar }),
        typeIs(type) {
          return this.type.includes(type as never)
        },
        typeMatches(charType) {
          return BaseMask.typeMatches(this.type, charType)
        }
      }
    }

    const splitMask = data.maskFormat.split('')
    const maskCharIndex = data.inputValue.length - 1
    
    const nextAlphanumericCharMask = splitMask
      .filter((_char, index) => index >= maskCharIndex)
      .find((char) => {
        const type = BaseMask.getCharType({ char, isMask: true })
        return !type.includes('special' as never)
      })

    this.mask = {
      format: data.maskFormat,
      currentIndex: maskCharIndex,
      char: {
        value: splitMask[maskCharIndex],
        type: BaseMask.getCharType({
          char: splitMask[maskCharIndex],
          isMask: true
        }),
        typeIs(type) {
          return this.type.includes(type as never)
        },
        typeMatches(charTypeToCompare: CharType) {
          return BaseMask.typeMatches(this.type, charTypeToCompare)
        }
      },
      nextChar: {
        value: splitMask[maskCharIndex + 1],
        type: BaseMask.getCharType({
          char: splitMask[maskCharIndex + 1],
          isMask: true
        }),
        typeIs(type) {
          return this.type.includes(type as never)
        },
        typeMatches(charTypeToCompare: CharType) {
          return BaseMask.typeMatches(this.type, charTypeToCompare)
        }
      },
      nextAlphanumericChar: {
        value: nextAlphanumericCharMask,
        type: BaseMask.getCharType({
          char: nextAlphanumericCharMask!,
          isMask: true
        })
      }
    }

    this.meta = {
      inputType: data.inputType,
      isFirstDigit: data.inputValue.length === 1,
      isLastDigit: data.inputValue.length === data.maskFormat.length
    }
  }

  static getCharType({ char, isMask }: { char: string; isMask?: boolean }) {
    let charType = ['special'] as CharType

    if (isMask) {
      if (char === 'A') charType = ['text']
      if (char === '9') charType = ['numeric']
      if (char === '*') charType = ['text', 'numeric']
    } else {
      if (/^[a-zA-Z\u00C0-\u00FF]*$/.test(char)) charType = ['text']
      if (/^[0-9]$/i.test(char)) charType = ['numeric']
    }

    return charType
  }

  static typeMatches(firstType: CharType, secondType: CharType) {
    return firstType.some((type: string) => {
      return secondType.includes(type as never)
    })
  }

  public preventTyping() {
    return this.input.fullText.slice(0, -1)
  }

  public autoFill({ fromIndex }: { fromIndex: number }) {
    let fill: string = ''

    const splitMask = this.mask.format.split('').filter((_char, index) => {
      return index >= fromIndex
    })

    splitMask.every((char) => {
      const type = BaseMask.getCharType({ char, isMask: true })
      const isSpecial = type.includes('special' as never)

      fill = isSpecial ? fill + char : fill

      return isSpecial
    })

    return fill
  }
}
