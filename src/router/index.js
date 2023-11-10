import { createRouter, createWebHistory } from 'vue-router' // 导入组件
import GoodList from '@/views/goods/index.vue'
import Index from '@/views/index.vue'

const routes = [
    {
        path: '/',
        name: 'admin',
        component: () => import('@/layouts/index.vue')
    },
    {
        path: '/login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录页'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/404.vue')
    }
]

// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [
    {
        path: '/',
        name: '/',
        component: Index,
        meta: {
            title: '后台首页'
        }
    },
    {
        path: '/goods/list',
        name: '/goods/list',
        component: GoodList,
        meta: {
            title: '商品管理'
        }
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

// 动态添加路由的方法
export function addRoutes(menus) {
    // 是否有新的路由
    let hasNewRoutes = false
    const findAndAddRoutesByMenus = (arr) => {
        arr.forEach((e) => {
            let item = asyncRoutes.find((o) => o.path == e.frontpath)
            if (item && !router.hasRoute(item.path)) {
                router.addRoute('admin', item)
                hasNewRoutes = true
            }
            if (e.child && e.child.length > 0) {
                findAndAddRoutesByMenus(e.child)
            }
        })
    }

    findAndAddRoutesByMenus(menus)

    return hasNewRoutes
}
