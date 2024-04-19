<script setup lang="ts">
import { useRouter } from 'vue-router'
import { inject, ref, watch, unref, reactive, type Ref, onMounted } from 'vue'
import { UI1input, UI1checkbox, UI1button } from '@/components/UI1'
import { loginApi } from '@/api/forum/index'
import { useCookies } from 'vue3-cookies'

const cookie = useCookies().cookies
const router = useRouter()//路由
const isLogin = inject('logStatus') as Ref //是否登入
//回首頁
const goHome = () => {
    if (unref(isLogin)) {
        router.push('./')
    }
}
watch(isLogin, () => {
    goHome()
}, { immediate: true })

//登入帳號密碼
const logText = reactive<{ title: string; ref: string; password: boolean; message?: string }[]>([{ title: '帳號', ref: '', password: false, message: '' }, { title: '密碼', ref: '', password: true }])
const keepLogin = ref(false)//是否保持登入
const { doLogin } = loginApi // 登入API
const sendLogin = async (data: typeof logText) => {
    data[0].message = ''
    const isAllow = data.filter((item: typeof data[0]) => {
        return !item.ref
    }).length !== 0

    if (isAllow) {
        data[0].message = '請輸入帳號或密碼'
        return 0
    }

    doLogin({
        account: data[0]?.ref,
        password: data[1]?.ref
    }).then((i) => {
        cookie.remove('forumToken')
        keepLogin.value ? cookie.set('forumToken', i.data?.token) : window.sessionStorage.setItem('forumToken', i.data?.token)
        router.push('./')
    }).catch(() => {
        data[0].message = '帳號或密碼錯誤'
    })

}

</script>
<template>
    <div id="a" class="w100% flex justify-center flex-wrap bg-sub rd-1">
        <div class="w70% flex justify-center flex-wrap mt-10">
            <div class="w-300px rd-1 bg-white ps-5 pe-5 pb-5 m-5 children:mt-5 children:mb-5">
                <div class="text-center w-full">
                    <div class=" ">
                        <img src="@/components/icons/logo3.png" alt="">
                        <div>學習知識解決問題</div>
                    </div>
                </div>
                <div v-for="(i, index) in logText">
                    <UI1input :name="i.title" v-model="i.ref" :title="i.title" :password="i.password" :id="index" />
                    <div class="text-red font-600">{{ i.message }}</div>
                </div>
                <div>
                    <UI1checkbox lable="保持登入狀態" v-model="keepLogin" />
                </div>
                <div>
                    <UI1button class="w-100% bg-base hover:bg-base/50 text-white" @click="() => {
                    sendLogin(logText)
                }">登入</UI1button>
                </div>


            </div>
        </div>
        <div class="h-300px w-100%">
        </div>
    </div>
</template>