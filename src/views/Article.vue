<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {} from 'vue-router'
import { UI1button, UI1window } from '@/components/UI1'
const props = defineProps({
  page: String,
  title: String
})
onMounted(async () => {
  // let r = aaa({props.page})
})
</script>
<template>
  <UI1window title="邊框"
    >簡單邊框，內部放置個元件
    <template #description> 下方為補助說明，不加 "description" 屬性才會出現 </template>
  </UI1window>
  <UI1window title="按鈕">
    <UI1button type="danger"> 按鈕 </UI1button>
    <UI1button type="primary"> 按鈕2 </UI1button>
    <UI1button type="warning"> 按鈕3 </UI1button>
    <UI1button> 預設 </UI1button>
    <template #description> 按鈕目前只可以改變顏色...，按鈕內直接使用元素自訂 </template>
  </UI1window>
</template>
