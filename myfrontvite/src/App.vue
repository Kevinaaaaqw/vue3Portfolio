<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { Menu, PortfolioMenu } from './forumMenu'
import ForunFooter from './forumFooter'
import { ref, provide, watch, computed } from 'vue'
import { useMember } from '@/stores/member'
import { routerPath } from '@/router/routerPath'

//API 功能區
const { currentRoute } = useRouter()

// //頁面更新就檢查一次登入狀態
// watch(currentRoute, () => {
//   useMember().loginCheck()
// })

//特定頁面全版
const isFull = computed(() => currentRoute?.value?.fullPath === routerPath.forum ? false : true)
//論壇元件加載
const forum = computed(() => { })

</script>
<template>
  <PortfolioMenu />
  <!-- <Menu />
  <div class="flex justify-center bg-sub">
    <div :class="{ 'w-full': true, 'max-w-1000px': isFull }">
      <RouterView />
    </div>
  </div>
  <ForunFooter /> -->
</template>
<style>
a {
  text-decoration: none;
}
</style>
