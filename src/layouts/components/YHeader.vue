<template>
    <div class="y-header">
        <span class="logo">
            <el-icon class="mr-1">
                <eleme-filled></eleme-filled>
            </el-icon>
            小叶编码
        </span>
        <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
            <fold v-if="$store.state.asideWidth === '250px'" />
            <Expand v-else />
        </el-icon>
        <!-- 刷新按钮 -->
        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon class="icon-btn" @click="handleRefresh">
                <Refresh />
            </el-icon>
        </el-tooltip>

        <div class="ml-auto flex items-center">
            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <el-icon class="icon-btn" @click="toggle">
                    <full-screen v-if="!isFullscreen" />
                    <Aim v-else />
                </el-icon>
            </el-tooltip>

            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon-right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <!-- 修改密码 -->
    <form-drawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">
            <el-form-item props="oldPassword" label="旧密码">
                <el-input v-model="form.oldPassword" placeholder="请输入旧密码" />
            </el-form-item>
            <el-form-item props="password" label="新密码">
                <el-input type="password" v-model="form.password" placeholder="请输入新密码" show-password />
            </el-form-item>
            <el-form-item prop="rePassword" label="确认密码">
                <el-input type="password" v-model="form.rePassword" placeholder="请再次输入密码" show-password></el-input>
            </el-form-item>
        </el-form>
    </form-drawer>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
import FormDrawer from '@/components/FormDrawer.vue'
import { useLogout, useRePassword } from '@/composables/useManager.js'

const { isFullscreen, toggle } = useFullscreen()
const handleRefresh = () => window.location.reload()

const { handleLogout } = useLogout()
const { formDrawerRef, form, rules, formRef, onSubmit, openRePasswordForm } = useRePassword()

const handleCommand = (command) => {
    switch (command) {
        case 'rePassword':
            openRePasswordForm()
            break
        case 'logout':
            handleLogout()
            break
    }
}
</script>

<style lang="scss" scoped>
.y-header {
    @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
    height: 64px;
    z-index: 1000;
}

.logo {
    width: 250px;
    @apply flex items-center justify-center text-xl font-thin;
}

.icon-btn {
    @apply flex items-center justify-center cursor-pointer;
    width: 42px;
    height: 64px;

    &:hover {
        @apply bg-indigo-600;
    }
}

.y-header .dropdown {
    height: 64px;
    @apply flex items-center justify-center cursor-pointer mx-5;
}
</style>
