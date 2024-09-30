<script setup lang="ts">
import { ref } from 'vue'
import { ForumHead } from '@/components/forumHead'
import { Slogan } from '@/components/slogan'
import NotFoundPage from '@/views/forum/notFoundPage.vue'
import { useRoute } from "vue-router"
import { forumCategoryApi } from '@/api/forum'

// 拿參數找文章
const isArticlesList = ref<boolean>(true)
const { getArticlesList } = forumCategoryApi
const query = useRoute().query
getArticlesList(query).then((i) => {
    console.log(i)
})

console.log(useRoute().query)


</script>
<template>
    <div v-if="isArticlesList">
        <ForumHead />
        <Slogan />
    </div>
    <NotFoundPage v-else />
</template>