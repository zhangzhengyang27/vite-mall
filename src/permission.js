import { getToken } from '@/composables/auth'
import { hideFullLoading, showFullLoading, toast } from '@/composables/util'
import { addRoutes, router } from '@/router/index.js'
import store from './store' // 全局前置守卫

// 全局前置守卫
let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
    // 显示loading
    showFullLoading()

    const token = getToken()

    // 没有登录，强制跳转回登录页
    if (!token && to.path !== '/login') {
        toast('请先登录', 'error')
        return next({ path: '/login' })
    }

    // 防止重复登录
    if (token && to.path === '/login') {
        toast('请勿重复登录', 'error')
        return next({ path: from.path ? from.path : '/' })
    }

    // 如果用户登录了，自动获取用户信息，并存储在 vuex 当中
    let hasNewRoutes = false
    if (token && !hasGetInfo) {
        let { menus } = await store.dispatch('getInfo')
        hasGetInfo = true
        // 动态添加路由
        hasNewRoutes = addRoutes(menus)
    }

    // 设置页面标题
    document.title = (to.meta.title ? to.meta.title : '') + '-小叶编程商城后台'

    hasNewRoutes ? next(to.fullPath) : next()
})

// 全局后置守卫
router.afterEach((to, from) => hideFullLoading())
