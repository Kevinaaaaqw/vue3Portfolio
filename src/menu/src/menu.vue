<script setup lang="tsx">
// import { ElMenu, ElMenuItem } from 'element-plus'
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
    :router="true"
    :default-active="activeIndex"
    :class="menuCSS()"
  >
    <el-menu-item index="/">
      <template #title><span>首頁</span></template></el-menu-item
    >
    <el-menu-item index="toDoList">
      <template #title><span>代辦事項清單功能</span></template></el-menu-item
    >
  </el-menu>
</template>
