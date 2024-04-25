<script setup lang="ts">
import { ForumHead } from '@/components/forumHead'
import { Slogan } from '@/components/slogan'
import { CategroyDiv } from '@/components/categoryDiv'
import { forumCategoryApi } from '@/api/forum'
import { useRouter } from 'vue-router'
import { ref } from 'vue';

const { getCategory } = forumCategoryApi

getCategory().then((item) => {
    categoryList.value = item.data.categoryList
    console.log(item)
})

const categoryList = ref<[{ article_category: number; article_category_name: string; article_category_img: string; article_category_introduce?: string }?]>([])


const router = useRouter()
const toCategory = (path?: string | number) => {
    router.push('/forum/' + path?.toString())
}

</script>
<template>
    <ForumHead />
    <Slogan />
    <div class="grid grid-cols-2 justify-center">
        <CategroyDiv v-for="(i) in categoryList" :src="i?.article_category_img" alt="404"
            :categoryName="i?.article_category_name" :introdece="i?.article_category_introduce" ulr="/aaa"
            @click="() => { toCategory(i?.article_category) }" />
    </div>
</template>