<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
import { getScreenType } from '@/commonFunction/screenType/screenType'
import { Menu } from './menu'
import { ref, provide } from 'vue'
const screenType = ref<any>(getScreenType())
window.addEventListener('resize', () => {
  screenType.value = getScreenType()
})
provide('screenType', screenType)
</script>
<template>
  <el-config-provider :locale="zhTw">
    <div class="flex h-screen w-100%">
      <Menu />
      <div class="flex-grow overflow-clip">
        <RouterView />
      </div>
    </div>
  </el-config-provider>
</template>
