<template>
  <div id="app">
    <Form ref="form" :schema="form" @submit="onSubmit">
      <Field name="name" />
      <Field name="age" />

      <button type="submit">enviar</button>
    </Form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form, Field, schema } from '@/entry.esm'

const form = schema.typed({
  name: schema.string().required(),
  age: schema.number().required()
})

type Fields = typeof form

export default Vue.extend({
  components: { Form, Field },
  data() {
    return { form }
  },
  methods: {
    onSubmit(values: Fields) {
      console.log(values)
    }
  }
})
</script>
