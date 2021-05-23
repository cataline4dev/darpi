interface MixedMessages {
  required: string
  confirmed: string
  oneOf: string
  equal: string
}

interface StringMessages {
  string: string
  email: string
  url: string
  length: string
  minLength: string
  maxLength: string
  minWords: string
  maxWords: string
  first: string
  last: string
}

interface NumberMessages {
  isNumber: string
  min: string
  max: string
  positive: string
  negative: string
  between: string
}

interface FileMessages {
  size: string
}

export interface Messages {
  mixed: MixedMessages
  string: StringMessages
  number: NumberMessages
  file: FileMessages
}

export interface PartialMessages {
  mixed?: Partial<MixedMessages>
  string?: Partial<StringMessages>
  number?: Partial<NumberMessages>
  file?: Partial<FileMessages>
}
