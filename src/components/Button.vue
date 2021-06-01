<template>
  <button class="button" type="submit" :disabled="parentData.isLoading">
    <span v-if="!parentData.isLoading" class="text">{{ text }}</span>
    <component v-else :is="loadingComponent"></component>
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
    },
    loader: {
      type: String,
      default: 'ellipsis'
    }
  },
  computed: {
    parentData(): FormI {
      return this.$parent as unknown as FormI
    },
    loadingComponent() {
      return () => import(`./loaders/${this.capitalize(this.loader)}.vue`)
    }
  },
  methods: {
    capitalize(text: string) {
      return text && text[0].toUpperCase() + text.slice(1)
    }
  }
})
</script>

<style scoped>
.button {
  display: grid;
  justify-content: center;
  align-content: center;
}
</style>
