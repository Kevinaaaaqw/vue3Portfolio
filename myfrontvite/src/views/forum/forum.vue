<script setup lang="ts">
import { UI1input } from '@/components/UI1'
import { ref } from 'vue'

const searchInput = ref<string>('')

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
        <div class="w-300px">
            <UI1input class="w-full" v-model="searchInput" name="'search'" id="'search'"><div class="flex justify-between"><div>搜尋</div><div><img src="" alt=""></div></div></UI1input>
        </div>
    </div>
</template>