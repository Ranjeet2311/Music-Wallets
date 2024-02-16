import './assets/style/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { projectAuth } from './firebase/config'

let app

// to avoid routing to login everytime we refresh the page, use 'onAuthStateChanged', it check if user is logged in, then loads the app after establishing the connection.

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    app.use(router)
    app.mount('#app')
  }
})
