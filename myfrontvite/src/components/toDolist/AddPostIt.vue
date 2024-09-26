<script setup lang="ts">
import EditInput from '@/components/toDolist/editInput.vue'
import DetailDiv from '@/components/toDolist/DetailDiv.vue'
import PostItButton from '@/components/toDolist/PostItButton.vue'
import { addPostItStore } from '@/stores/toDoList/addPostItStore'
import { toDoListStore } from '@/stores/toDoList/toDoListStore'
import { languageStore } from '@/stores/toDoList/languageStore'
import Plus from '@/components/icons/plus-solid.svg'
import { computed } from 'vue';
import { storeToRefs } from 'pinia'
const { lang } = storeToRefs(languageStore())

const { addData } = storeToRefs(addPostItStore())
const emit = defineEmits(['focus', 'save', 'cancle'])

const sendStatus = () => {
    if (addData.value.isDone) {
        addData.value.isImportant = false
    }
}

const focus = () => {
    addPostItStore().addData.isEdit = true
}
const cancle = () => {
    addPostItStore().reset()
}

const save = () => {
    if (addData.value.title.trim()) {
        toDoListStore().addTodolist({ ...addData.value, isEdit: false })
        addPostItStore().reset()
    }
}

const divCSS = computed(() => {
    if (!addData.value.isEdit) return 'w-310px md:w-620px h-65px duration-500 bg-bg-4 border-solid border-bg-2 border-2px box-border rd-1 flex items-center add children:pe-2 cursor-pointer'
    return 'w-310px md:w-620px h520px duration-500 relative bg-bg-1 overflow-hidden rd-1 outline-none'
})

</script>
<template>
    <div class="addShadow">
        <div tabindex="0" @focus="() => focus()" :class="divCSS">
            <!-- add Input -->
            <div @click="() => focus()" v-show="!addData?.isEdit" class="w-100% h-full flex items-center">
                <img class="w-20px h-20px ms-3%" :src="Plus" />
                <span>{{ lang.addTask }}</span>
            </div>

            <!-- add Form -->
            <div v-show="addData?.isEdit">
                <EditInput v-model="addData" :isTitle="!addData?.isEdit" @sendStatus="sendStatus" />
                <DetailDiv v-model="addData" />
                <PostItButton :onCancle="() => cancle()" :onSave="() => save()" :status="'add'" :absolute="true" />
            </div>

        </div>
    </div>
</template>
<style>
.addShadow {
    box-shadow: 0px 4px 4px var(--bg-2);
    ;
}
</style>