<script setup lang="ts">
import { ref, computed } from 'vue'


const props = defineProps<{
    article_category?: string,
    forum_article_id?: string,
    forum_reply_id?: string,
    forum_item_title?: string,
    account?: string,
    creat_time?: string,
    forum_article_content?: string,
    comment?: string
}>()

const time = computed(() => {
    let t = props.creat_time && new Date(props.creat_time)
    if (!t) return ''

    return `${t.getFullYear()}/${(t.getMonth() + 1).toString().padStart(2, '0')}/${t.getDate().toString().padStart(2, '0')}`


})

</script>
<template>
    <div
        class="w-300px h-300px border-solid border-1px border-base rd-1 bg-subbg cursor-pointer box-border overflow-hidden hover:outline-auto">
        <!-- 發文帳號、時間 -->
        <div class="flex ps-3 font-size-14px children:me-3 children:children:font-bold text-base/50">
            <div>
                <p>{{ props.account }}</p>
            </div>
            <div>
                <p class="font-light">
                    {{ time }}
                </p>
            </div>
        </div>
        <!-- 標題 -->
        <div class="overflow-hidden line-clamp-2">
            <h4 class="font-size-16px m-0 m-3">
                {{ props.forum_item_title }}
            </h4>
        </div>
        <!-- 內容 -->
        <div class="overflow-hidden line-clamp-4 text-base/50">
            <h4 class="font-size-16px m-0 m-3">
                {{ props.forum_article_content }}
            </h4>
        </div>
        <!-- 分隔線與下方顯示留言數 -->
        <div
            class="mt-9 ms-1 me-1 border-solid border-base/50 border-none border-t-1px border-l-0px border-r-0px border-b-0px">
        </div>
        <div class="flex justify-end mt-3 me-3">
            <div class="flex justify-between w-70px">
                <img src="../../icons/message.png" alt="">
                <div class="flex text-center items-center">{{ props.comment || '0' }}</div>
            </div>
        </div>
    </div>
</template>