<template>
    <div class="y-menu" :style="{ width: $store.state.asideWidth }">
        <el-menu
            :default-active="defaultActive"
            unique-opened
            :collapse="isCollapse"
            class="border-0"
            @select="handleMenuClick"
            :collapse-transition="true"
        >
            <template v-for="(item, index) in asideMenus" :key="index">
                <!-- 存在子菜单的 -->
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                            <component :is="item2.icon" />
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <!-- 不存在子菜单的 -->
                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.name }}</span></el-menu-item
                >
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()

const defaultActive = ref(route.path)

// 监听路由变化
onBeforeRouteUpdate((to, from) => {
    defaultActive.value = to.path
})

// 判断是否折叠
const isCollapse = computed(() => store.state.isCollapse)

// 侧边菜单
const asideMenus = computed(() => store.state.menu)

// 菜单点击事件
const handleMenuClick = (path) => {
    router.push(path)
}
</script>

<style lang="scss" scoped>
.y-menu {
    transition: all 0.2s;
    top: 64px;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    @apply shadow-md fixed bg-light-50;
}

.y-menu::-webkit-scrollbar {
    width: 0px;
}
</style>
