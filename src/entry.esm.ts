import _Vue, { PluginFunction } from 'vue'

import * as components from '@/components/index'

const install: PluginFunction<any> = function installFormValidations(
  Vue: typeof _Vue
) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component)
  })
}

export default install

export * from '@/components/index'
