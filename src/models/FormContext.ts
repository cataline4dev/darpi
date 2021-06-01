import { Error } from '../models/Error'

export interface FormContext<TValues> {
  readonly errors: Error[]
  readonly submitted: boolean
  readonly isValid: boolean
  readonly isLoading: boolean
  resetForm(fields?: Partial<TValues>): void
  addValues(fields: Partial<TValues>): void
  addErrors(fields: Partial<TValues>): void
  removeErrors(fieldList?: (keyof Partial<TValues>)[]): void
  enableLoading(): void
  disableLoading(): void
}
