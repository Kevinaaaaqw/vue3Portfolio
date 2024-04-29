<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import Avatar from '@/components/avatar'
import { useMember } from '@/stores/member'

//取得路由功能
const router = useRouter()
//轉頁面
const toPage = (link: string) => {
  router.push(link)
}

//去論壇並初始化分類
const toForum = () => {
  toPage('/forum')
}

const logStatus = computed(() => useMember().logStatus)

</script>
<template>
  <div class="w-100% flex justify-center bg-subbg">
    <div class="w-full justify-between flex max-w-1000px">
      <img class="cursor-pointer" src="@/components/icons/logo2.png" alt="載入失敗" @click="() => { toPage('/') }">
      <div
        class="flex items-center children:cursor-pointer children:ps-3 children:pe-3 hover:children:bg-black/20 hover:children:duration-500">
        <div @click="() => { toPage('/') }">
          <h3>首頁</h3>
        </div>
        <div @click="() => { toForum() }">
          <h3>論壇</h3>
        </div>
        <div v-if="!logStatus" class="flex" @click="() => { toPage('/login') }">
          <img class="object-contain w40px" src="../../components/icons/login.png" alt="">
          <h3>登入</h3>
        </div>
        <Avatar v-else />
      </div>
    </div>
  </div>
</template>
