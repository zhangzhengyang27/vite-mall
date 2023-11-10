<template>
  <el-container>
    <el-header>
      <y-header />
    </el-header>
    <el-container>
      <el-aside>侧面</el-aside>
      <el-main>
        主要区域
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import YHeader from '@/layouts/components/YHeader.vue'
</script>

<style lang="scss" scoped></style>
