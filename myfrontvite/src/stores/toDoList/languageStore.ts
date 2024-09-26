import { defineStore } from 'pinia'
import { chinese } from '@/components/toDolist/language/chinese'
import { english } from '@/components/toDolist/language/english'
import { ref } from 'vue'

export const languageStore = defineStore('language', () => {
    const lang = ref(chinese)

    const allLang = [chinese, english]

    return { lang, allLang }


})