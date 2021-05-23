import { Error } from '../models/Error'

export interface FormContext<TValues> {
  readonly errors: Error[]
  readonly submitted: boolean
  readonly isValid: boolean
  readonly isLoading: boolean
  resetForm(fields?: Partial<TValues>): void
  setErrors(fields?: Partial<TValues>): void
  enableLoading(): void
  disableLoading(): void
}
