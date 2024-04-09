<script setup lang="ts">
import { fa } from 'element-plus/es/locale/index.mjs';
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const toPage = (link: string) => {
  router.push(link)
}
</script>
<template>
  <div class="w-100% flex justify-center bg-subbg">
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
          <img class="object-contain w40px" src="../../components/icons/login.png" alt="">
          <h3>登入</h3>
        </div>
        <div class="flex hover:bg-subbg">
          <div class="border-solid border-1 border-base rd-10 w40px h40px flex bg-bg items-center justify-center">
            <img class="object-contain w-60%" src="../../components/icons/user.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
