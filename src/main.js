import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import router from '@/router/router'
import App from './App.vue'
import store from './store'
// 重置样式
import 'normalize.css/normalize.css'
import './style.css'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'

// 导入组件
const app = createApp(App)

import * as icons from '@element-plus/icons-vue'
Object.keys(icons).forEach((key) => {
  app.component(key, icons[key])
})

app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.use(store)

app.mount('#app')

// createApp(App).mount('#app')
