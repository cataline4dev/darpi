import Vue, { VueConstructor } from 'vue'
import schema from './schema'
import configure from './configure'
import type { FormContext } from './models/FormContext'

let Form: VueConstructor<Vue>
let Field: VueConstructor<Vue>

export { Form, Field, schema, configure }
export type { FormContext }
