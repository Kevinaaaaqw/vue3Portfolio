<script setup lang="ts">
import EditInput from '@/components/toDolist/editInput.vue'
import DetailDiv from '@/components/toDolist/DetailDiv.vue'
import PostItButton from '@/components/toDolist/PostItButton.vue'
import { toDoListStore } from '@/stores/toDoList/toDoListStore'
import { ref, watch } from 'vue';
import type { postIt } from './types/type'

const { editDataList, deleteDataList } = toDoListStore()
const props = defineProps<{ data: postIt, index: number }>()
const editData = ref<postIt>({
    ...props.data
})

watch(props, () => {
    editData.value = { ...props.data }
})

const sendStatus = () => {
    if (editData.value.isDone) {
        editData.value.isImportant = false
        editDataList({ isDone: editData.value.isDone, isImportant: editData.value.isImportant, isEdit: editData.value.isEdit }, props.index)
    }
    editDataList({ isDone: editData.value.isDone, isImportant: editData.value.isImportant, isEdit: editData.value.isEdit }, props.index)
    toDoListStore().sortTodolist()
}

const cancle = () => {
    editDataList({ isEdit: false }, props.index)
    editData.value = { ...props.data }
}

const save = () => {
    editDataList({ ...editData.value, isEdit: false }, props.index)
    editData.value = { ...props.data }
}

const duration500 = ref()

const divCSS = ref()

watch(() => [editData.value.isEdit], (a, b) => {
    if (a && b && a[0] != b[0]) {
        duration500.value = 'duration-500'
        setTimeout(() => {
            duration500.value = ''
        }, 500)
    }
    if (editData.value.isEdit) {
        divCSS.value = `h520px outline-none`
        return 0
    }
    if (editData.value.deadLineDate || editData.value.file.file || editData.value.comment) {
        divCSS.value = `w-310px h-102px box-border add`
        return 0
    }
    divCSS.value = `w-310px h-76px box-border add`

}, { immediate: true })

</script>
<template>
    <div tabindex="0"
        :class="`${divCSS} ${duration500} md:w-620px relative w-310px overflow-hidden editPostIt-show bg-bg-1 rd-1`">
        <div class="absolute left-1.1 top-50% translate-y--50% z-1 hidden editPostIt-show font-size-24px placeholder">
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <!-- Edit Form -->
        <EditInput v-model="editData" :isTitle="!editData?.isEdit" @sendStatus="sendStatus"
            @do-delete="() => { deleteDataList(props.data) }" />
        <DetailDiv v-model="editData" />
        <PostItButton v-if="editData.isEdit" :onCancle="() => cancle()" :onSave="() => save()" :status="'edit'"
            :absolute="true" />
    </div>
</template>
<style>
.editPostIt-show:hover .editPostIt-show {
    display: block;
}
</style>