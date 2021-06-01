<template>
  <div :class="['field', classes]">
    <label v-if="label" :for="name"> {{ label }} </label>

    <input
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :readonly="parentData.isLoading ? true : readonly"
      :value="parentData.fields[name]"
      :maxlength="mask ? mask.length : false"
      @input="onChange($event)"
    />

    <span v-show="error && autoMessages === 'on'" class="error-message">
      {{ error }}
    </span>

    <slot v-bind="{ error }" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { FormI } from './Form.vue'
import { FieldEvent } from '../models/FieldEvent'
import handleMask from '../mask'

type Rule = FormI['rules'][0]['test']

const types = [
  'text',
  'tel',
  'file',
  'number',
  'password',
  'email',
  'search',
  'radio',
  'checkbox'
]

export default Vue.extend({
  name: 'Field',
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    mask: {
      type: String,
      default: null
    },
    rules: {
      type: Array as PropType<Rule[]>,
      default: () => []
    },
    autoMessages: {
      type: String,
      default: 'on'
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => {
        const isValid = types.includes(value)

        if (!isValid) {
          console.warn(`allowed types are ${types}`)
        }

        return isValid
      }
    }
  },
  data() {
    return {
      parentData: this.$parent as unknown as FormI
    }
  },
  created() {
    this.$parent.$emit('addField', this.name)

    this.rules.map((ruleMethod) => {
      this.parentData.rules.push({
        name: ruleMethod.name.split(' ').pop() || 'unknown',
        field: this.name,
        test: ruleMethod
      })
    })
  },
  computed: {
    classes(): object {
      return {
        'has-error': this.error
      }
    },
    error(): string | undefined {
      const firstError = this.parentData.errors.find(({ field }) => {
        return field === this.name
      })

      return firstError?.message
    }
  },
  methods: {
    onChange(event: FieldEvent<HTMLInputElement>) {
      if (this.mask) handleMask(event, this.mask)

      // to Form component
      this.parentData.fields[this.name] = event.target.value

      // active @chage to library user
      this.$emit('change', event.target.value)
    }
  }
})
</script>
