// import { ref, computed } from 'vue'
import type { postIt } from '@/components/toDolist/types/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const addPostItStore = defineStore('addPostIt', () => {

    const addData = ref<postIt>({
        title: '',
        isEdit: false,
        isDone: false,
        status: 'add',
        deadLineDate: '',
        deadLineTime: null,
        file: { file: null, date: '' },
        comment: '',
        isImportant: false
    })

    const reset = () => {
        addData.value = {
            title: '',
            isEdit: false,
            isDone: false,
            status: 'add',
            deadLineDate: '',
            deadLineTime: null,
            file: { file: null, date: '' },
            comment: '',
            isImportant: false
        }
    }

    return { addData, reset }
})
