<template>
  <form :class="['form', classes]" @submit.prevent="submit">
    <slot v-bind="formContext" />
  </form>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Schema } from '../models/Schema'
import { Error } from '../models/Error'
import hasEqualKeys from '../helpers/hasEqualKeys'
import getFields from '../helpers/getFields'
import validate from '../schema/validate'
import format from '../schema/format'
import { FormContext } from '../../src'

interface Rule {
  name: string
  field: string
  test: (
    value: string,
    formContext?: FormContext<Record<string, any>>
  ) => Promise<true | string>
}

export interface FormI {
  fields: Record<string, any>
  errors: Error[]
  submitted: boolean
  rules: Rule[]
  isValid: boolean
  isLoading: boolean
  resetForm: () => void
  setErrors: () => void
  validate: () => Promise<void>
  enableLoading: () => void
  disableLoading: () => void
}

export default Vue.extend({
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    theme: {
      type: String,
      default: 'light',
      validator: (value) => ['light', 'dark'].includes(value)
    }
  },
  data() {
    return {
      fields: {} as FormI['fields'],
      errors: [] as FormI['errors'],
      submitted: false,
      rules: [] as FormI['rules'],
      isValid: false,
      isLoading: false,
      meta: {
        fields: {}
      }
    }
  },
  watch: {
    fields: {
      deep: true,
      async handler() {
        if (!this.submitted) return

        await this.validate()
      }
    }
  },
  created() {
    this.$on('addField', (field: string) => {
      this.$set(this.meta.fields, field, null)
    })

    this.fields = getFields({ ...this.schema })
  },
  computed: {
    classes(): object {
      return {
        loading: this.isLoading,
        light: this.theme === 'light',
        dark: this.theme === 'dark'
      }
    },
    formContext<T>(): FormContext<T> {
      return {
        errors: this.errors,
        submitted: this.submitted,
        isValid: this.isValid,
        isLoading: this.isLoading,
        resetForm: this.resetForm,
        addValues: this.addValues,
        addErrors: this.addErrors,
        removeErrors: this.removeErrors,
        enableLoading: this.enableLoading,
        disableLoading: this.disableLoading
      }
    }
  },
  methods: {
    async validate() {
      if (!hasEqualKeys(this.schema, this.meta.fields)) {
        return console.error(
          '[@cataline.io/darpi] schema and fields do not match'
        )
      }

      this.errors = validate(this.schema, this.fields)

      const validations = this.rules.map(async (rule) => {
        const hasError = this.errors.some(({ field }) => field === rule.field)

        if (hasError) return

        const result = await rule.test(
          this.fields[rule.field],
          this.formContext
        )

        if (result === true) return true

        this.errors.push({
          field: rule.field,
          validation: rule.name,
          message: result
        })
      })

      await Promise.all(validations)

      this.isValid = this.errors.length <= 0
    },
    async submit() {
      this.submitted = true

      await this.validate()

      if (this.errors.length > 0) return

      const formattedValues = format(this.schema, this.fields)

      this.$emit('submit', formattedValues, this.formContext)
    },
    resetForm(newValues?: FormI['fields']) {
      Object.keys(this.fields).forEach((field) => {
        this.fields[field] =
          newValues && newValues[field] !== undefined ? newValues[field] : ''
      })

      this.submitted = false
      this.isValid = false
    },
    addValues(fields: FormI['fields']) {
      Object.keys(fields).forEach((key) => {
        this.fields[key] = fields[key]
      })
    },
    addErrors(fields: Partial<FormI['fields']>) {
      Object.keys(fields).forEach((key) => {
        this.errors.push({
          validation: 'unknow',
          field: key,
          message: fields[key]
        })
      })
    },
    removeErrors(fieldList?: any[]) {
      this.errors = fieldList
        ? this.errors.filter(({ field }) => !fieldList.includes(field))
        : []
    },
    enableLoading() {
      this.isLoading = true
    },
    disableLoading() {
      this.isLoading = false
    }
  }
})
</script>
