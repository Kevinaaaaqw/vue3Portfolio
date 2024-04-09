<script setup lang="ts">
import {useRouter} from 'vue-router'
const router = useRouter()

const returnPage = ()=>{
    setTimeout(()=>{
        console.log(router)
        router.push('./')
    },5000)
}
returnPage()
</script>
<template>
    404
</template>