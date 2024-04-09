<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const toPage = (link: string) => {
  router.push(link)
}
</script>
<template>
  <div class="w-100% flex justify-center bg-white">
    <div class="w-full justify-between flex max-w-1000px">
      <img class="cursor-pointer" src="../../components/icons/logo2.png" alt="載入失敗" @click="() => { toPage('./') }">
      <div
        class="flex items-center children:cursor-pointer children:ps-3 children:pe-3 hover:children:bg-black/20 hover:children:duration-500">
        <div @click="() => { toPage('./') }">
          <h3>首頁</h3>
        </div>
        <div @click="() => { toPage('./forum') }">
          <h3>論壇</h3>
        </div>
        <div class="flex" @click="() => { toPage('./login') }">
          <img class="object-contain" src="../../components/icons/login.png" alt="">
          <div></div>
          <h3>登入</h3>
        </div>
      </div>
    </div>
  </div>
</template>
