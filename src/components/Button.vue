<template>
  <button class="button" type="submit" :disabled="parentData.isLoading">
    {{ text }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { FormI } from './Form.vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    parentData(): FormI {
      return this.$parent as unknown as FormI
    }
  }
})
</script>
