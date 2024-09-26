import { defineStore } from 'pinia'
import { languageStore } from '@/stores/toDoList/languageStore'
import { storeToRefs } from 'pinia'


export const timeStore = defineStore('uploadedTime', () => {

  //判断一個日期是否是當前的昨天
  const uploadedTime = (target: Date) => {
    const { lang } = storeToRefs(languageStore()) 
    const targetTime = target.getTime()  //  檔案上傳時間
    const now = new Date()               //  現在時間
    const nowZero = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`).getTime(); //當日0時

    const nowTime = now.getTime() - targetTime
    const day = (nowZero - targetTime) / (24 * 3600 * 1000) //

    if (nowTime < 1000 * 3600) return `${lang.value.uploaded} ${Math.floor(nowTime / 1000 / 60)} ${lang.value.minute} ${lang.value.ago}`
    if (nowTime < 1000 * 3600 * 24 && day < 0) return `${lang.value.uploaded} ${Math.floor(nowTime / 1000 / 60 / 60)} ${lang.value.hour} ${lang.value.ago}`
    if (day < 1) return `${lang.value.uploaded} ${lang.value.yesterday}`
    if (day < 2) return `${lang.value.uploaded} ${lang.value.tow} ${lang.value.days} ${lang.value.ago}`
    return `${lang.value.uploaded} ` + target.toLocaleDateString()
  }

  return { uploadedTime }
})
