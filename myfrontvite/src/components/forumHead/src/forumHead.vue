<script setup lang="ts">
import { UI1input } from '@/components/UI1'
import { ref } from 'vue'

const searchInput = ref<string>('')

const toSearchPage = (path: string) => {
    console.log(path)
}

</script>
<template>
    <div class="flex justify-between items-center">
        <div class="flex children:ms-2 children:me-2 children:cursor-pointer hover:children:text-sub">
            <div>
                <h3>分類</h3>
            </div>
            <div>
                <h3>全部類別</h3>
            </div>
        </div>
        <div class="w-300px relative">
            <UI1input :keydown-enter="() => { toSearchPage(searchInput) }" v-model="searchInput" :title="'搜尋'" name="search"
                id="search" />
            <img class="absolute cursor-pointer right-0 top-50% right-10px translate-y--50%"
                src="@/components/icons/search.png" alt="404" @click="() => { toSearchPage(searchInput) }">
        </div>
    </div>
</template>
<style>
.forum-head-line::after {
    contain: content;
}
</style>