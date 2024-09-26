<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { languageStore } from '@/stores/toDoList/languageStore'
import { computed } from 'vue';
const { lang } = storeToRefs(languageStore())
const props = defineProps<{ status: 'edit' | 'add' | 'delete', absolute?: boolean }>()
const emit = defineEmits(['save', 'cancle'])
const textWord = computed(() => {
    switch (props.status) {
        case 'add':
            return lang.value.addTask
        case 'edit':
            return lang.value.save
        case 'delete':
            return lang.value.yes
        default:
            return ''
    }
})

const showPicture = computed(() => {
    if (props.status === 'add' || props.status === 'edit') return true
    return false
})

//控制確認選項是否為藍色背景
const bgControl = computed(() => {
    if (props.status === 'add' || props.status === 'edit') return true
    return false
})
</script>
<template>
    <div :class="{ 'absolute': props.absolute }" class="bottom-0 h-60px w-full flex cursor-pointer">
        <div @click="() => emit('cancle')" :class="{ 'text-danger': bgControl }"
            class="w-50% bg-bg-4 title flex items-center justify-center box-border">
            <i v-show="showPicture" class="fa-solid fa-x fa-xs me-3"></i> <span>{{ lang.cancel }}</span>
        </div>
        <div @click="() => emit('save')" :class="{ 'bg-base_1': bgControl, 'bg-danger': !bgControl }"
            class="w-50% title text-bg-4 flex items-center justify-center">
            <i v-show="showPicture" class="fa-solid fa-plus fa-sm me-3"></i>
            <span>{{ textWord }}</span>
        </div>
    </div>
</template>