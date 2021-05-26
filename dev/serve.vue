<template>
  <div id="app">
    <Form ref="form" :schema="fields" @submit="onSubmit">
      <Field name="name" />
      <Field name="age" />

      <Button text="enviar" />
    </Form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form, Field, Button, schema } from '@/entry.esm'
import { FormContext } from '../src'

const fields = schema.typed({
  name: schema.string().required(),
  age: schema.number().required()
})

type Fields = typeof fields

export default Vue.extend({
  components: { Form, Field, Button },
  data() {
    return { fields }
  },
  methods: {
    onSubmit(values: Fields, { enableLoading }: FormContext<Fields>) {
      enableLoading()
      console.log(values)
    }
  }
})
</script>
