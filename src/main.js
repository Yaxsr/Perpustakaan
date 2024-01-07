
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toastify from "vue3-toastify";


const app = createApp(App)

app.use(Vue3Toastify, {
    autoClose: 3000,
  });

app.use(router)

app.mount('#app')
