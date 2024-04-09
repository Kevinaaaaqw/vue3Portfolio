<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ElConfigProvider, ElRow, ElCol } from 'element-plus'
import zhTw from 'element-plus/es/locale/lang/zh-tw.mjs'
import { Menu } from './forumMenu'
import { ref, provide } from 'vue'
const loading = ref<any>(false)
provide('loading', loading)
</script>
<template>
  <Menu />
  <RouterView />
</template>
