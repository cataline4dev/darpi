import MaskController from './MaskController'
import { FieldEvent } from '../models/FieldEvent'

export default (event: FieldEvent<HTMLInputElement>, format: string) => {
  if (event.inputType === 'insertFromPaste') {
    let typing = ''

    event.target.value.split('').forEach((char) => {
      typing = typing + char

      const data = {
        inputType: 'insert',
        inputChar: char,
        inputValue: typing,
        maskFormat: format
      }

      const maskController = new MaskController(data)

      typing = maskController.run()
    })

    event.target.value = typing
  } else {
    const data = {
      inputType: event.inputType,
      inputChar: event.data!,
      inputValue: event.target.value,
      maskFormat: format
    }

    const maskController = new MaskController(data)

    event.target.value = maskController.run()
  }
}
