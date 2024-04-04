/**
 * @Author: 17197
 * @Date: 2024/3/24
 * @Description: index.js
 * @Version: 1.0
 * @Last Modified time : 2024/3/24
 **/
import '@/styles/main.css'
import './fonts/iconfont.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

import hljs from 'highlight.js'

VMdPreview.use(githubTheme, {
    Hljs: hljs
})

import App from './App.vue'
import router from './router'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import { Icon } from '@arco-design/web-vue'

const IconFont = Icon.addFromIconFontCn({ src: 'https://at.alicdn.com/t/c/font_4225649_2417kjcext9.js' })

const app = createApp(App)
const pinia = createPinia()

// Vue.mixin(globalMixin)
app.component('IconFont', IconFont)
app.use(router)
app.use(ArcoVueIcon)
app.use(createPinia())
pinia.use(piniaPluginPersistedstate)
app.use(VMdPreview)

app.mount('#app')
