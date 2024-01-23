import { createApp } from 'vue'
import './assets/css/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index'
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App)
    .use(createPinia())
    .use(VueSweetalert2)
    .use(router)
    .mount('#app')
