import { createApp } from 'vue'
import * as icons from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
// 全局注册指令
import permission from '@/directives/permission.js'
import { router } from '@/router/index.js'
import store from './store/index.js'
import App from './App.vue'
import 'normalize.css/normalize.css'
import './style.css'
import 'element-plus/dist/index.css'
import 'virtual:windi.css' // 导入组件
// 全局注册过滤器
import './permission'

// 导入组件
const app = createApp(App)

Object.keys(icons).forEach((key) => {
    app.component(key, icons[key])
})

app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.use(store)

console.log(import.meta.env)

app.use(permission)

app.mount('#app')
