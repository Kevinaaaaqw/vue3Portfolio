<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ElConfigProvider, ElRow, ElCol } from 'element-plus'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
import { getScreenType } from '@/commonFunction/screenType/screenType'
import { Menu } from './menu'
import { ref, provide } from 'vue'
const screenType = ref<any>(getScreenType())
const loading = ref<any>(false)
window.addEventListener('resize', () => {
  screenType.value = getScreenType()
})
provide('screenType', screenType)
provide('loading', loading)
</script>
<template>
  <el-config-provider :locale="zhTw">
    <el-col v-loading="loading" class="flex h-screen w-100%">
      <Menu />
      <div class="flex-grow overflow-x-clip overflow-y-scroll">
        <RouterView />
      </div>
    </el-col>
  </el-config-provider>
</template>
