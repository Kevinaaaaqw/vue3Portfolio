import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type postIt } from '@/components/toDolist/types/type'


export const toDoListStore = defineStore('toDoList', () => {
    const toDoList = ref<postIt[]>([]) //任務清單

    //加入任務
    const addTodolist = (mask: postIt) => {
        toDoList.value.push(mask)
        sortTodolist()
    }

    //編輯任務
    const editDataList = (data: object, index: number) => {
        toDoList.value[index] = { ...toDoList.value[index], ...data }
    }

    const deleteWindowStatus = ref(false) //是否進入刪除確認狀態

    //刪除任務
    const deleteDataList = (data: postIt) => {
        toDoList.value = toDoList.value.filter((item) => item !== data)
    }

    //任務排序
    const sortTodolist = () => {
        const array = [...toDoList.value]
        array.sort((a: postIt, b: postIt) => {
            if (a.isImportant && !b.isImportant) {
                return -1;
            }
            if (!a.isImportant && b.isImportant) {
                return 1;
            }
            if (a.isDone && !b.isDone) {
                return 1;
            }
            if (!a.isDone && b.isDone) {
                return -1;
            }
            return 0;
        })
        toDoList.value = array
    }

    //清空任務(用不太到)
    const reset = () => {
        toDoList.value = []
    }


    //所有任務收合
    const closeAll = () => {
        toDoList.value = toDoList.value.map((i) => {
            return { ...i, isEdit: false }
        })
    }


    //
    //任務順序交換
    //

    const dragItem = ref<postIt>()

    const dragIndex = ref<string>()

    const setDragIndex = (index: string) => {
        dragIndex.value = index
    }

    const changeItems = (index: string) => {
        if (dragIndex.value && isNaN(parseInt(dragIndex.value))) return 0
        const num = parseInt(dragIndex.value as string)
        dragItem.value = toDoList.value[parseInt(index)]
        toDoList.value[parseInt(index)] = toDoList.value[num]
        toDoList.value[num] = dragItem.value
        sortTodolist()
    }

    //
    //任務順序交換
    //
    return { toDoList, deleteWindowStatus, addTodolist, sortTodolist, editDataList, deleteDataList, reset, closeAll, setDragIndex, changeItems }
}, { persist: { storage: localStorage } })