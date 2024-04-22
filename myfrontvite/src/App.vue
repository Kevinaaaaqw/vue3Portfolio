<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { Menu } from './forumMenu'
import { ref, provide, watch, computed } from 'vue'
import { useMember } from '@/stores/member'

//API 功能區
const { currentRoute } = useRouter()

//頁面更新就檢查一次登入狀態
watch(currentRoute, () => {
  useMember().loginCheck()
})
const isFull = computed(() => currentRoute?.value?.fullPath === '/' ? '' : 'max-w-900px')

</script>
<template>
  <Menu />
  <div class="flex justify-center">
    <div :class="'w-100%' + ' ' + isFull">
      <RouterView />
    </div>
  </div>
</template>
<style>
a {
  text-decoration: none;
}
</style>
