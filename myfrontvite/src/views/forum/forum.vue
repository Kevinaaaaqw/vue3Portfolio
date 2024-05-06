<script setup lang="ts">
import { ForumHead } from '@/components/forumHead'
import { Slogan } from '@/components/slogan'
import { CategroyDiv } from '@/components/categoryDiv'
import { forumCategoryApi } from '@/api/forum'
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import { ArticleComponent } from '@/components/articleComponent'

const { getCategory, getRecommendedAarticle } = forumCategoryApi

const categoryList = ref<[{ article_category: number; article_category_name: string; article_category_img: string; article_category_introduce?: string }?]>([])
const recommendedArticleList = ref<{
    article_category: string, forum_article_id: string,
    forum_reply_id: string,
    forum_item_title: string,
    account: string,
    forum_article_content: string,
    creat_time: string,
    comment: string
}[]>([])

getCategory().then((item) => {
    Array.isArray(item.data.categoryList) && (categoryList.value = item.data.categoryList)
})

const isLoadingFinish = ref<boolean>(false)

getRecommendedAarticle().then((item) => {
    Array.isArray(recommendedArticleList.value) && (recommendedArticleList.value = item.data.articleList)(isLoadingFinish.value = true)
})

const router = useRouter()
// 轉文章分類頁面
const toArticleCategory = (path?: string | number) => {
    router.push(`/forum/article?ac=${path?.toString()}&page=1`)
}

// 轉文章分類頁面
const toWritings = (ac: string | number, ai: string | number) => {
    router.push(`/forum/article?ac=${ac?.toString()}&ai=${ai.toString()}`)
}

</script>
<template>
    <div class="p-2 min-h-600px">
        <ForumHead />
        <Slogan />
        <div class="grid justify-center mb-5 lg:grid-cols-2">
            <CategroyDiv v-for="(i) in categoryList" :src="i?.article_category_img" alt="404"
                :categoryName="i?.article_category_name" :introdece="i?.article_category_introduce" ulr="/aaa"
                @click="() => { toArticleCategory(i?.article_category) }" />
        </div>
        <div v-show="isLoadingFinish" class="text-base mb-5">
            <h2>最新文章</h2>
        </div>
        <div class="grid grid-cols-3 mb-5">
            <ArticleComponent @click="() => { toWritings(i.article_category, i.forum_article_id) }"
                v-for="(i) in recommendedArticleList" :article_category="i?.article_category"
                :forum_article_id="i?.forum_article_id" :forum_reply_id="i?.forum_reply_id"
                :forum_item_title="i?.forum_item_title" :account="i?.account"
                :forum_article_content="i?.forum_article_content" :creat_time="i?.creat_time" :comment="i?.comment" />
        </div>
    </div>

</template>