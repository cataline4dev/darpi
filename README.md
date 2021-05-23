# @cataline.io/darpi

Now you can be relaxed when it comes to forms validation in Vue.

We have the component `Form` and `Field` component that will be enough for you to create your powerful forms, and to validate the entries we have a validation `schema` that is strongly inspired by [Yup](https://github.com/jquense/yup), but it is made exclusively for our components, which makes the integration very simple and light.

## Install

```sh
npm i @cataline.io/darpi
```

## Usage

For use with Single File Components it is as easy as importing the `Form` and `Field` component, defining a validation `schema` and sending it as a prop to `Form`.

```html
<template>
  <form :schema="fields" @submit="onSubmit">
    <Field name="name" />
    <Field name="age" />

    <button type="submit">Go</button>
  </form>
</template>

<script>
  import { Form, Field, schema } from '@cataline.io/darpi'

  export default {
    components: { Form, Field },
    data() {
      return {
        fields: {
          name: schema.string().required().minWords(2),
          age: schema.number().required().min(18)
        }
      }
    },
    methods: {
      onSubmit(values) {
        console.log(values)
      }
    }
  }
</script>
```

### About error messages

Under the hood, each `Field` has a `span` tag that will be displayed in case there are any validation errors, the errors will be displayed one at a time in the order in which the schema was assembled.

```html
<div class="field has-error">
  <input id="age" name="age" type="text" />
  <span class="error-message"> {{ error }} </span>
</div>
```

### Custom error messages

There are two ways to define personalized messages.

First, within the method of each rule.

```js
fields: {
  name: schema.string().required('Yo! Put your name'),
  age: schema.number().min(18, 'You need to be adult'),
}
```

Second, at the component level or globally.

```js
import { configure } from '@cataline.io/darpi'

configure({
  messages: {
    mixed: {
      required: 'Yo! Put your name'
    },
    number: {
      min: 'You need to be adult'
    }
  }
})
```

### Using with TypeScript

If you are using TypeScript it is interesting that you have the correct typing.

```html
<script lang="ts">
  import Vue from 'vue'
  import { Form, Field, schema, FormContext } from '@cataline.io/darpi'

  const fields = schema.typed({
    name: schema.string().required(),
    age: schema.number().required()
  })

  type Fields = typeof fields

  export default Vue.extend({
    components: { Form, Field },
    data() {
      return { fields }
    },
    methods: {
      onSubmit(values: Fields, formContext: FormContext<Fields>) {
        try {
          // put `loading` class in the form
          formContext.enableLoading()

          // send to API
          console.log(values)

          // clear all fields
          formContext.formReset()
        } catch (error) {
          // define error messages for any field
          // they disappear when the field changes
          formContext.setErrors({
            name: 'Seu nome é bonito demais'
          })
        } finally {
          // remove class `loading` from Form
          formContext.disableLoading()
        }
      }
    }
  })
</script>
```

### Add custom rules

First create a method on the Vue instance.

```js
methods: {
  async uniqueEmail(email: string) {
    const alreadyExists = this.$axios.$get('/register-check', { email })

    return alreadyExists ? 'E-mail already registered' : true
  }
}
```

Then pass this method through the `rules` property to the field.

```html
<Field name="email" :rules="[uniqueEmail, anything]" />
```

> Custom rules will run after all the rules in the schema.

## About updates

We know that this is not adequate documentation and that a lot of information is missing, we will soon have a legal website with several documents, but if you are using TypeScript we are sure you will discover many things only with intellisense.

Until next updates 🚀
