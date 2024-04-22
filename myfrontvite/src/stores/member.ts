import { defineStore } from 'pinia'
import { loginApi } from '@/api/forum/index'
import { ref } from 'vue'

//API 功能區
const { checkLogin } = loginApi
//頁面更新就檢查一次登入狀態

export const useMember = defineStore('memberInfo', () => {
    //帳號
    const account = ref('')
    //是否登入狀態
    const logStatus = ref(false)

    //帳號清除
    const resetAccount = () => {
        account.value = ''
    }

    //檢查是否登入
    const loginCheck = () => {
        resetAccount()
        console.log(logStatus.value)
        checkLogin().then((res) => {
            logStatus.value = res.data?.account ? true : false
            account.value = res.data?.account
        }).catch(() => {
            logStatus.value = false
        })
    }
    return { account, logStatus, loginCheck }
})