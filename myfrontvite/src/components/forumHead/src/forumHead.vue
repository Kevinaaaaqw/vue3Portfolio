<script setup lang="ts">
import { UI1input } from '@/components/UI1'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const searchInput = ref<string>('')

const toSearchPage = (path: string) => {
    path && router.push('/forum/search?q=' + path)
}

const toCategoryPage = () => {
    router.currentRoute.value.path === '/forum' ? router.go(0) : router.push('/forum')
}

const toAllPage = () => {
    router.currentRoute.value.path === '/forum/article?ac=0' ? router.go(0) : router.push('/forum/article?ac=0')
}

</script>
<template>
    <div class="flex justify-between items-center">
        <div class="flex children:ms-2 children:me-2 children:cursor-pointer hover:children:text-base/50">
            <div @click="() => { toCategoryPage() }">
                <h3>分類</h3>
            </div>
            <div @click="() => { toAllPage() }">
                <h3>全部類別</h3>
            </div>
        </div>
        <div class="w-300px relative">
            <UI1input :keydown-enter="() => { toSearchPage(searchInput) }" v-model="searchInput" :title="'搜尋'"
                name="search" id="search" />
            <img class="absolute cursor-pointer right-0 top-50% right-10px translate-y--50%"
                src="@/components/icons/search.png" alt="404" @click="() => { toSearchPage(searchInput) }">
        </div>
    </div>
    <div class="border-b-1px border-solid border-bg/50 mb-3"></div>
</template>