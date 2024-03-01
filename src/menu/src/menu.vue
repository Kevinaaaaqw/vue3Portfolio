<script setup lang="tsx">
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { ref, inject, computed } from 'vue'
const activeIndex = ref('1')
const isCollapse = ref(inject('screenType'))
const menuCSS = () => {
  return isCollapse.value === 'mobile' ? '  bg-lime-500' : 'w-40 bg-lime-500'
}
</script>
<template>
  <el-menu
    :collapse="isCollapse === 'mobile'"
    :collapse-transition="false"
    :default-active="activeIndex"
    :class="menuCSS()"
  >
    <router-link to="/">
      <el-menu-item index="/">
        <template #title> 首頁 </template>
      </el-menu-item>
    </router-link>
    <router-link to="/toDoList">
      <el-menu-item index="toDoList">
        <template #title> 待辦事項清單功能 </template>
      </el-menu-item>
    </router-link>
    <el-sub-menu index="/Article">
      <template #title> 自製元件 </template>
      <router-link to="/Article/1">
        <el-menu-item index="Article/1">
          <template #title> UI 一代 </template>
        </el-menu-item>
      </router-link>
    </el-sub-menu>
  </el-menu>
</template>
<style scoped>
a {
  text-decoration: none;
}
</style>
