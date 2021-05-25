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
      @input="update($event.target.value)"
    />

    <span v-show="error" class="error-message">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { FormI } from './Form.vue'

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
    rules: {
      type: Array as PropType<Rule[]>,
      default: () => []
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
    update(value: any) {
      this.parentData.fields[this.name] = value
    }
  }
})
</script>
