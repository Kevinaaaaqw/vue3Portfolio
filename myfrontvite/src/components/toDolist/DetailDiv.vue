<script setup lang="ts">
import { computed, ref } from 'vue';
import type { postIt } from './types/type';
import { timeStore } from '@/stores/toDoList/timeStore'
import { storeToRefs } from 'pinia'
import { languageStore } from '@/stores/toDoList/languageStore'
const { lang } = storeToRefs(languageStore())
const { uploadedTime } = timeStore()

const model = defineModel<postIt>()
const textAreaStatus = ref(false)

//檔案上傳時間判斷
const fileTime = computed(() => {
    if (model.value && !model.value.file?.date) return ''
    return (model.value ? uploadedTime(new Date(model.value.file.date)) : '')
})

//檔案上傳
const changeFile = (data: any) => {
    if (data.target.files[0].size > 200000) { model.value && (model.value.file = { file: null, name: data.target.files[0].name, date: new Date() }) }
    model.value && (model.value.file = { file: data.target.files[0], name: data.target.files[0].name, date: new Date() })
}
</script>
<template>
    <div v-if="model" class="m-t-3 flex justify-center">
        <div class="w-80%">
            <!-- 時間選擇 -->
            <div class="h90px">
                <div class="flex children:m-2 items-center">
                    <i class="fa-solid fa-calendar-days" style="color: #000000;"></i>
                    <div class="subtitle">{{ lang.deadLine }}</div>
                </div>
                <div class="subtitle ms-38px flex">
                    <div class="w-162px">
                        <VueDatePicker v-if="model" v-model="model.deadLineDate" format="yyyy/MM/dd" hide-input-icon
                            inputClassName="post-border-style" placeholder="yyyy/mm/dd" :enable-time-picker="false" />
                    </div>
                    <div class="w-162px ms-2">
                        <VueDatePicker v-if="model" v-model="model.deadLineTime" format="hh:mm" hide-input-icon
                            time-picker inputClassName="post-border-style" placeholder="hh:mm" />
                    </div>
                </div>
            </div>
            <!-- 檔案選擇 -->
            <div class="h90px">
                <div class="flex children:m-2 items-center">
                    <i class="fa-regular fa-file" style="color: #000000;"></i>
                    <div class="subtitle">{{ lang.file }}</div>
                </div>
                <div class="subtitle ms-38px flex items-center">
                    <div class="me-2">
                        <div class="paragraph">{{ model.file?.name }}</div>
                        <div class="placeholder">{{ fileTime }}</div>
                    </div>
                    <label>
                        <input @change="(data: any) => changeFile(data)" type="file" style="display: none;">
                        <i class="fa-solid fa-square-plus cursor-pointer fa-xl text-bg-2 hover:text-base_1"></i>
                    </label>
                </div>
            </div>
            <!-- 備註 -->
            <div>
                <div class="flex children:m-2 items-center">
                    <i class="fa-regular fa-comment-dots" style="color: #000000;"></i>
                    <div class="subtitle">{{ lang.comment }}</div>
                </div>
                <div class="subtitle ms-38px flex items-center">
                    <textarea @dblclick="textAreaStatus = false" @blur="textAreaStatus = true"
                        :readonly="textAreaStatus" v-model="model.comment"
                        class="w-400px resize-none min-h-100px paragraph post-border-style"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.post-border-style {
    box-sizing: border-box;
    border-radius: 2px;
    border: none;
}

.post-border-style:focus {
    outline: none;
}

.post-border-style:hover {
    border: 1px solid var(--base_1);
    box-shadow: 0 0 4px var(--base_1);
}

.post-border-danger:hover {
    border-color: var(--danger);
    border: 1px solid var(--danger);
    box-shadow: 0 0 4px var(--danger);
}
</style>