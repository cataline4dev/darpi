import MaskBase from './MaskBase'

export default class MaskController extends MaskBase {
  run() {
    const eventsToIgnore = ['deleteByCut', 'deleteContentBackward']

    if (eventsToIgnore.includes(this.meta.inputType)) {
      return this.input.fullText
    }

    if (this.input.fullText.length > this.mask.format.length) {
      return this.preventTyping()
    }

    if (!this.meta.isLastDigit && this.input.char.typeIs('special')) {
      return this.preventTyping()
    }

    if (
      !this.mask.char.typeIs('special') &&
      this.mask.nextAlphanumericChar &&
      !this.input.char.typeMatches(this.mask.char.type)
    ) {
      return this.preventTyping()
    }

    if (this.meta.isFirstDigit && this.mask.char.typeIs('special')) {
      return this.autoFill({ fromIndex: 0 }) + this.input.fullText
    }

    if (
      !this.input.char.typeIs('special') &&
      this.mask.nextChar.typeIs('special')
    ) {
      return (
        this.input.fullText +
        this.autoFill({ fromIndex: this.mask.currentIndex + 1 })
      )
    }

    if (this.mask.char.typeIs('special')) {
      if (this.mask.nextAlphanumericChar.value) {
        if (this.input.char.typeMatches(this.mask.nextAlphanumericChar.type)) {
          const output =
            this.input.fullText.slice(0, -1) +
            this.mask.char.value +
            this.input.char.value

          return output
        } else {
          return this.preventTyping()
        }
      }

      if (!this.mask.nextAlphanumericChar.value) {
        if (this.input.char.value !== this.mask.char.value) {
          return this.preventTyping()
        }
      }
    }

    return this.input.fullText
  }
}
