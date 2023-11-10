import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { router } from '@/router/index.js'

export function useTabList() {
    const route = useRoute()
    const cookie = useCookies()

    const activeTab = ref(route.path)
    const tabList = ref([{ title: '后台首页', path: '/' }])

    // 添加标签导航栏
    function addTab(tab) {
        let noTab = tabList.value.filter((item) => item.path == tab.path)
        if (noTab) {
            tabList.value.push(tab)
            cookie.set('tabList', tabList.value)
        }
    }

    // 初识化标签导航栏
    function initTab() {
        let tabListCookie = cookie.get('tabList')
        if (tabListCookie) {
            tabList.value = tabListCookie
        }
    }

    // 调用初始化标签导航栏的方法
    initTab()

    // 监听路由的变化
    onBeforeRouteUpdate((to, from, next) => {
        activeTab.value = to.path
        addTab({ title: to.meta.title, path: to.path })
        next()
    })

    // 改变标签导航栏的值
    const changeTab = (tab) => {
        activeTab.value = tab.path
        router.push(tab.path)
    }

    // 关闭标签导航栏
    const closeTab = (tab) => {
        let index = tabList.value.findIndex((item) => item.path == tab.path)
        tabList.value.splice(index, 1)
        cookie.set('tabList', tabList.value)
        if (tab.path == activeTab.value) {
            let tabPath = tabList.value[index] ? tabList.value[index].path : '/'
            router.push(tabPath)
        }
    }

    // 关闭所有或者关闭其他
    const handleClose = (type) => {
        if (type == 'all') {
            activeTab.value = '/'
            tabList.value = [{ title: '后台首页', path: '/' }]
        } else {
            // 过滤只剩下首页和当前激活
            tabList.value = tabList.value.filter((tab) => tab.path == '/' || tab.path == activeTab.value)
        }
        cookie.set('tabList', tabList.value)
    }

    return {
        activeTab,
        tabList,
        changeTab,
        closeTab,
        handleClose
    }
}
