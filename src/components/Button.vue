<template>
  <button class="button" type="submit" :disabled="parentData.isLoading">
    <span v-if="!parentData.isLoading" class="text">{{ text }}</span>
    <component v-else :is="loaderComponent"></component>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { FormI } from './Form.vue'

// loaders
import Ellipsis from './loaders/Ellipsis.vue'
import Dashs from './loaders/Dashs.vue'

export default Vue.extend({
  components: { Ellipsis, Dashs },
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
    loaderComponent(): string {
      return this.capitalize(this.loader)
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
