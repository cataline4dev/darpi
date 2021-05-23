export interface Validation {
  name: string
  message: string
  params?: Record<string, any>
  test: (value: any, params?: any) => boolean
}

export interface Formatting {
  name: string
  params?: Record<string, any>
  format: (value: any, params?: any) => any
}

export interface Exception {
  name: string
  data?: Record<string, any>
}

export interface Schema {
  [key: string]: {
    validations: Validation[]
    formattings: Formatting[]
    exceptions: Exception[]
  }
}
