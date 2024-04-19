<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { Menu } from './forumMenu'
import { ref, provide, watch, inject } from 'vue'
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
</script>
<template>
    <Menu />
    <div class="flex justify-center">
      <div class="max-w-900px w-100%">
        <RouterView />
      </div>
    </div>
</template>
