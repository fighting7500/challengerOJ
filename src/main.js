/**
 * @Author: 17197
 * @Date: 2024/3/24
 * @Description: index.js
 * @Version: 1.0
 * @Last Modified time : 2024/3/24
 **/
import '@/styles/login.scss'
import './fonts/iconfont.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
