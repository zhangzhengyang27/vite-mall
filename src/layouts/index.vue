<template>
    <el-container>
        <el-header>
            <y-header />
        </el-header>
        <el-container>
            <el-aside :width="$store.state.asideWidth">
                <y-menu />
            </el-aside>
            <el-main>
                <y-tag-list />
                <router-view v-slot="{ Component }">
                    <transition name="fade">
                        <keep-alive :max="10">
                            <component :is="Component"></component>
                        </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import YHeader from '@/layouts/components/YHeader.vue'
import YMenu from '@/layouts/components/YMenu.vue'
import YTagList from '@/layouts/components/YTagList.vue'
</script>

<style lang="scss" scoped>
.el-aside {
    transition: all 0.2s;
}
.fade-enter-from {
    opacity: 0;
}
.fade-enter-to {
    opacity: 1;
}
.fade-leave-from {
    opacity: 1;
}
.fade-leave-to {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}
.fade-enter-active {
    transition-delay: 0.3s;
}
</style>
