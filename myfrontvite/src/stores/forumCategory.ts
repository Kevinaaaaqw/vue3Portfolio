import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useforumCategory = defineStore('forumCategory', () => {
    const category = ref<0 | 1>(0)

    const categoryName = computed(() => {
        switch (category.value) {
            case 0:
                return '顯示分類頁面'
            case 1:
                return '顯示全部類別搜尋結果'

        }
    })

    return { category, categoryName }
})