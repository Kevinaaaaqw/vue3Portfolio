<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, unref, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { languageStore } from '@/stores/toDoList/languageStore'
const { lang } = storeToRefs(languageStore())

const route = useRoute()//路由
const path = computed(() => route.path)//網址
const router = useRouter()//使用路由

//當前頁面CSS
const checkPath = (path: string | Ref, target: string) => {
    if (unref(path) === target) return 'text-bg-4 menu-line text-center'
    return ''
}

//移動路由
const toPage = (path: string) => {
    router.push(path)
}

</script>
<template>
    <div class="w-full bg-base_1 h-80px flex justify-center">
        <div
            class="max-w-310px md-max-w-620px  w-full flex justify-between h-full children:flex children:relative children:items-center children:h-full children:title hover:children:cursor-pointer ">
            <RouterLink :to="{ name: 'toDoListMyTasks' }">
                <div :class="checkPath(path, '/MyTasks')">
                    {{ lang.myTask }}</div>
            </RouterLink>
            <RouterLink :to="{ name: 'toDoListInProgress' }">
                <div :class="checkPath(path, '/InProgress')">
                    {{ lang.inProgress }}
                </div>
            </RouterLink>
            <RouterLink :to="{ name: 'toDoListCompleted' }">
                <div :class="checkPath(path, '/Completed')">
                    {{ lang.completed }}
                </div>
            </RouterLink>
        </div>
    </div>
</template>
<style>
.menu-line::after {
    content: "";
    display: block;
    background-color: #00408B;
    position: absolute;
    width: 100%;
    height: 5px;
    bottom: 0px;
    left: 0px;
}
</style>