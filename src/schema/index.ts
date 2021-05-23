import StringSchema from './string'
import NumberSchema from './number'

import { InferType } from '../models/InferType'

const schema = {
  string() {
    return new StringSchema()
  },
  number() {
    return new NumberSchema()
  },
  typed<T>(shape: T) {
    return shape as InferType<typeof shape>
  }
}

export default schema
