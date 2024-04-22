<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { useMember } from '@/stores/member';

const cookie = useCookies().cookies//餅乾
const member = useMember()//會員資料
//取得路由功能
const router = useRouter()

const showCloseBG = ref<boolean>(false)

//CSS收放動畫
const blockHeight = computed(() => {
  return showCloseBG.value ? 'max-h200px' : 'max-h-0 border-subbg'
})

//登出清除cookie和session
const clearMember = () => {
  window.localStorage.removeItem('forumToken')
  window.sessionStorage.removeItem('forumToken')
  cookie.remove('forumToken')
  router.go(0)
}

//轉跳會員專區
const toMemberPage = () => {
  showCloseBG.value = false
  closeDiv()
  router.push('/register')
}


const showDiv = ref(true)
//解決進入會員頁面div慢縮動畫
const closeDiv = () => {
  showDiv.value = false
  setTimeout(() => {
    showDiv.value = true
  }, 500);
}

</script>
<template>
  <div v-show="showCloseBG" class="absolute top-0 left-0 h-100vh w-full z-1 opacity-100 opacity-0 hover:bg-red/0"
    @click="() => { showCloseBG = false }"></div>
  <div class="hover:bg-subbg relative">

    <div @click="() => { showCloseBG = true }"
      class="border-solid border-1 border-base rd-10 w40px h40px flex bg-bg items-center justify-center relative">
      <img class="object-contain w-60%" src="@/components/icons/user.png" alt="">
    </div>
    <div v-show="showDiv"
      :class="'absolute w-100px mt-2 rd-1 bg-white right-0 z-2 flex overflow-hidden justify-center time border-1 border-solid transition-duration-500' + ' ' + blockHeight"
      style="cursor:default;">
      <div class="cursor-pointer hover:children:text-blue children:pt-2 last-children:pb-2">
        <div @click="() => { toMemberPage() }">
          {{ member.account }}
        </div>
        <div @click="() => { clearMember() }">登出</div>
      </div>
    </div>
  </div>
</template>
<style>
/* .time {
  transition: 1s;
} */
</style>
