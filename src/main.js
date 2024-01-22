import { createApp } from 'vue'
import './assets/css/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index'

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
