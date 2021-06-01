<template>
  <div id="app">
    <Form :schema="fields" @submit="onSubmit">
      <Field name="name" />
      <Field name="colors" />

      <Button text="enviar" />
    </Form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form, Field, Button, schema } from '@/entry.esm'

const fields = schema.typed({
  name: schema.string().required(),
  colors: schema.string().required().oneOf(['red', 'blue', 'yellow'])
})

type Fields = typeof fields

export default Vue.extend({
  components: { Form, Field, Button },
  data() {
    return { fields }
  },
  methods: {
    onSubmit(values: Fields) {
      console.log(values)
    }
  }
})
</script>
