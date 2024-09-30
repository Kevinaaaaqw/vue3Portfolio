<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { RouterView, useRouter, RouterLink, useRoute } from 'vue-router'
import {
    ElMenu,
    ElMenuItem,
} from 'element-plus'
const menuActive = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    push({ name: key });
}

const { currentRoute, push } = useRouter()
onMounted(() => [
    menuActive.value = currentRoute.value.name?.toString() ?? ''
])

</script>
<template>
    <el-menu :default-active="menuActive" mode="horizontal" background-color="#87CEEB" text-color="#002366"
        active-text-color="#fab907" @select="handleSelect">
        <el-menu-item index="project3Search">
            搜尋
        </el-menu-item>
        <el-menu-item index="project3List">
            收藏清單
        </el-menu-item>
    </el-menu>
</template>