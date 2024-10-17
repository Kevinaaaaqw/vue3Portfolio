<script setup lang="ts">
import { RouterView, useRouter, RouterLink, useRoute } from 'vue-router'
import { Menu, PortfolioMenu } from './forumMenu'
import ForumFooter from './forumFooter'
import { ref, provide, watch, computed } from 'vue'
import { useMember } from '@/stores/member'
import { routerPath } from './router/routerPath'
import MenuList from '@/components/toDolist/MenuList.vue'
import Project3MovieMenu from '@/components/project3Movie/menu.vue'
import PportfolioSelfFooter from '@/components/portfolioSelf/footer.vue'

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

// 路徑檢查
const routerCheck = (pathName: string) => {
  return currentRoute.value.name?.toString().includes(pathName)
}

</script>
<template>
  <!-- <Menu /> -->
  <!-- 個人介紹 -->
  <PortfolioMenu class="fixed top-0 w-full z-1" v-if="routerCheck('home')" />
  <div class="flex justify-center box-border" v-if="routerCheck('home')">
    <RouterView class="py-100px" />
  </div>
  <PportfolioSelfFooter class="" v-if="routerCheck('home')" />

  <!-- toDoList 作品清單  -->
  <MenuList v-if="routerCheck('toDoList')" />
  <div class="bg-bg-6 w-full flex justify-center box-border min-h-100vh" v-if="routerCheck('toDoList')">
    <RouterView />
  </div>

  <!-- 作品 ==> 電影清單  -->
  <Project3MovieMenu v-if="routerCheck('project3')" />
  <div class="w-full flex justify-center box-border min-h-100vh" v-if="routerCheck('project3')">
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
