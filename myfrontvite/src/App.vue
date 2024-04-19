<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { Menu } from './forumMenu'
import { ref, provide, watch, inject, computed } from 'vue'
import { loginApi } from '@/api/forum/index'

const logStatus = ref(false)
provide('logStatus', logStatus)

const loading = ref<any>(false)
provide('loading', loading)

//API 功能區
const { checkLogin } = loginApi
const { currentRoute } = useRouter()

//頁面更新就檢查一次登入狀態
watch(currentRoute, () => {
  //檢查是否登入
  checkLogin().then((res) => {
    logStatus.value = res.data?.account ? true : false
  }).catch(() => {
    logStatus.value = false
  })
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
