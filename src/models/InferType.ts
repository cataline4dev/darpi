import MixedSchema from '../schema/mixed'

export type InferType<T> = {
  [P in keyof T]: T[P] extends MixedSchema<infer TS> ? TS : never
}
