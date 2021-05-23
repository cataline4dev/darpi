import { Messages } from '../models/Messages'

const messages: Messages = {
  mixed: {
    required: 'Este campo é obrigatório',
    oneOf: 'Valor deve ser um dos {arrayOfValues}',
    confirmed: '{field} deve ser igual a {reference}',
    equal: 'Deve ser igual a {value}'
  },
  string: {
    string: 'O valor precisa ser texto',
    email: 'Insira um e-mail válido',
    url: 'Insira uma URL válida',
    length: 'O {field} deve ter {length} caracteres',
    maxLength: 'O valor não deve ter mais que {maxLength} caracteres',
    minLength: 'O valor deve conter pelo menos {minLength} caracteres',
    maxWords: 'Deve ter no máximo {maxWords} palavras',
    minWords: 'Deve ter no mínimo {minWords} palavras',
    first: 'A primeira letra deve ser {letter}',
    last: 'A última letra deve ser {letter}'
  },
  number: {
    isNumber: 'O valor precisa ser numérico',
    max: 'Precisa ser {max} ou menor',
    min: 'Precisa ser {min} ou maior',
    negative: 'O número deve ser negativo',
    positive: 'O número deve ser positivo',
    between: 'O número precisa estar entre {min} e {max}'
  },
  file: {
    size: 'Deve ser no máximo {size}mb'
  }
}

export default messages
