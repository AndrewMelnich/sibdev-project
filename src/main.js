import '@/assets/style/base.scss'
import '@/assets/style/mixins.scss'
import '@/assets/style/vars.scss'
import '@/assets/fonts/roboto.scss'
import '@/assets/fonts/pt-sans.scss'
import 'floating-vue/dist/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index'
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'

const pinia = createPinia()
const app = createApp(App)
app.use(FloatingVue)
app.use(router)
app.use(pinia)

app.mount('#app')


