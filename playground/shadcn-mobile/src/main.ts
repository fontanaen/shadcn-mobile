import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import App from './app.vue'
import './assets/main.css'

const router = createRouter({
  history: createWebHistory(),
  routes
})

if (import.meta.hot) { 
    handleHotUpdate(router) 
}

createApp(App)
  .use(router)
  .mount('#app')
