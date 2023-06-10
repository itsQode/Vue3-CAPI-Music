import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export default {
  install(app) {
    const components = import.meta.glob('../components/base/*.vue', {
      eager: true
    })

    Object.entries(components).forEach(([path, module]) => {
      const componentName = upperFirst(
        camelCase(
          path
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
      )

      console.log(componentName)
      app.component(`${componentName}`, module.default)
    })
  }
}
