<script setup lang="ts">
import { RouterView, useRouter, RouterLink, useRoute } from 'vue-router'
import { Menu, PortfolioMenu } from './forumMenu'
import ForunFooter from './forumFooter'
import { ref, provide, watch, computed } from 'vue'
import { useMember } from '@/stores/member'
import { routerPath } from '@/router/routerPath.ts'
import MenuList from '@/components/toDolist/MenuList.vue'

//API 功能區
const { currentRoute } = useRouter()

// //頁面更新就檢查一次登入狀態
watch(currentRoute, () => {
  // useMember().loginCheck()
})
//特定頁面全版
const isFull = computed(() => currentRoute?.value?.fullPath === routerPath.forum ? false : true)
//論壇元件加載
const forum = computed(() => { })

const isToDoListPage = computed(() => {
  return currentRoute.value.name?.toString().includes('toDoList')
}
)

</script>
<template>
  <!-- <Menu /> -->
  <!-- 個人介紹 -->
  <PortfolioMenu class="fixed top-0 w-full z-1" v-if="!isToDoListPage" />
  <div class="flex justify-center" v-if="!isToDoListPage">
    <RouterView class="py-100px" />
  </div>

  <!-- toDoList 作品清單  -->
  <MenuList v-if="isToDoListPage" />
  <div class="bg-bg-6 w-full flex justify-center min-h-100vh" v-if="isToDoListPage">
    <RouterView />
  </div>


  <!-- <div class="flex justify-center bg-sub">
    <div :class="{ 'w-full': true, 'max-w-1000px': isFull }">
    </div>
  </div> -->
  <!-- <ForunFooter /> -->
</template>
<style>
:root {
  --base: #4A90E2;
  --bg-4: #FFFFFF;
  --bg-2: #C8C8C8;
  --danger: #D0021B;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
