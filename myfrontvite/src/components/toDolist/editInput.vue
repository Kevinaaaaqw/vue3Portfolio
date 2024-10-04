<script setup lang="ts">
import starSolid from '@/components/icons/star-solid.svg'
import starRegular from '@/components/icons/star-regular.svg'
import ChexkBox from '@/components/toDolist/CheckBox.vue'
import solidPen from '@/components/icons/solid-pen.vue'
import solidPenEdit from '@/components/icons/solid-pen-edit.vue'
import PostItButton from '@/components/toDolist/PostItButton.vue'
import { type editInput, type postIt } from '@/components/toDolist/types/type'
import { storeToRefs } from 'pinia'
import { languageStore } from '@/stores/toDoList/languageStore'
import { toDoListStore } from '@/stores/toDoList/toDoListStore'
import { computed, ref } from 'vue'

const { lang } = storeToRefs(languageStore())
const { deleteWindowStatus } = storeToRefs(toDoListStore())
const props = defineProps<editInput>()
const model = defineModel<postIt>()
const emit = defineEmits(['sendStatus', 'doDelete'])

//切換是否為重要Mask
const handelisImportant = () => {
    if (model.value) (model.value.isImportant = !model.value.isImportant, emit('sendStatus'))
}

//點擊編輯鈕展開
const turnIsEdit = () => {
    if (model.value) (model.value.isEdit = true)
}

const haveItems = computed(() => {
    return ((model.value?.deadLineDate || model.value?.file.file || model.value?.comment) && !model.value?.isEdit)
})

//時間
const time = computed(() => {
    if (model.value?.deadLineDate) {
        let t = new Date(model.value?.deadLineDate)
        if (t.getFullYear() !== new Date().getFullYear()) {
            return `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()}`
        }
        return `${t.getMonth() + 1}/${t.getDate()}`
    }
    return ''
})

//控制刪除確認窗
const deleteWindow = ref(false)

</script>
<template>
    <div class="relative flex flex-wrap w-full post-hr"
        :class="{ 'bg-choose': model?.isImportant, 'h-105px': haveItems, 'h-76px': !haveItems }">
        <div :class="`w-full h-76px relative flex items-center gap-3 px-3 justify-between`">
            <div class="ps-2 flex h-76px items-center">
                <div class="max-md-hidden">
                    <ChexkBox v-if="model" v-model="model.isDone" size="md" @change="() => emit('sendStatus')" />
                </div>
                <div class="md-hidden">
                    <ChexkBox v-if="model" v-model="model.isDone" size="sm" @change="() => emit('sendStatus')" />
                </div>
                <input v-if="model && !props.isTitle" type="text" v-model="model.title"
                    :class="{ 'decoration-line-through': model?.isDone }"
                    class="border-none h-28px focus:outline-none w-150px md:w-400px bg-bg-1/0 title cursor-pointer hover:bg-bg-6 placeholder:title"
                    :placeholder="lang.typeSomethingHere" />

                <div v-else>
                    <div :class="{ 'decoration-line-through': model?.isDone }"
                        class="border-none h-28px focus:outline-none w-150px md:w-400px title relative flex items-center">
                        <div class="overflow-hidden text-ellipsis" :title="model?.title">
                            {{ model?.title }}
                        </div>
                    </div>
                    <div class="absolute children:me-3 p-t-1 h-24px flex items-center placeholder">
                        <div v-if="model?.deadLineDate">
                            <i v-if="model?.deadLineDate" class="fa-solid fa-calendar-days"></i>
                            {{ time }}
                        </div>
                        <i v-if="model?.file.file" class="fa-regular fa-file"></i>
                        <i v-if="model?.comment" class="fa-regular fa-comment-dots"></i>
                    </div>
                </div>
            </div>
            <!-- 圖示狀態 -->
            <div class="flex items-center gap-2 md-gap-4 children:cursor-pointer">
                <div class="w-fit flex items-center justify-center" @click="() => handelisImportant()">
                    <img v-if="model && model.isImportant" class="w-16px md-w-24px" :src="starSolid" alt="">
                    <img v-else class="w-16px md-w-24px" :src="starRegular" alt="">
                </div>
                <div>
                    <solidPen v-if="model && model.isEdit" class="font-size-16px md-font-size-24px" />
                    <solidPenEdit v-else class="font-size-16px md-font-size-24px" @click="() => turnIsEdit()" />
                </div>
                <i class="fa-solid fa-trash font-size-16px md-font-size-24px hover:text-red"
                    @click="() => { deleteWindow = true; deleteWindowStatus = true }"></i>
            </div>
        </div>
    </div>


    <div v-if="deleteWindow"
        class="z-2 fixed top-0% left-0% w-100vw h-100vh bg-black/10 flex justify-center items-center">
        <div class="bg-bg-1 rd-1 w-500px title">
            <div class="h-140px flex justify-center items-center">
                <div>
                    {{ lang.isSureDelete }}
                </div>
            </div>
            <PostItButton :onCancle="() => { deleteWindow = false; deleteWindowStatus = false }"
                :onSave="() => { deleteWindow = false; deleteWindowStatus = false; emit('doDelete'); }"
                :status="'delete'" />
        </div>
    </div>
</template>
<style>
.post-hr::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    top: 101%;
    box-sizing: content-box;
    border: solid var(--bg-2);
    border-width: 3px 0 0 0;
}
</style>