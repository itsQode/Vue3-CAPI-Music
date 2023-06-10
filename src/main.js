import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerSW } from 'virtual:pwa-register'

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from './includes/validation'
import { auth } from './includes/firebase.js'
import Icon from '@/directives/icon'
import GlobalComponents from './includes/_globals'
import progressBar from './includes/progress-bar'

import './assets/base.css'
import './assets/main.css'
import 'nprogress/nprogress.css'

registerSW({ immediate: true })

progressBar(router)

let app

auth.onAuthStateChanged(() => {
  if (app) return
  app = createApp(App)

  app.use(createPinia())
  app.use(router)
  app.use(VeeValidatePlugin)
  app.use(GlobalComponents)
  app.directive('icon', Icon)

  app.mount('#app')
})
