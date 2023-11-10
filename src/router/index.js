import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'admin',
        component: () => import('@/layouts/index.vue')
    }
    // {
    //     path: '/',
    //     name: 'helloWorld',
    //     component: () => import('@/components/HelloWorld.vue'),
    // },
    // {
    //     path: '/helloWorld',
    //     name: 'helloWorld',
    //     component: () => import('@/components/HelloWorld.vue'),
    // },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
