<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {} from 'vue-router'
import { UI1button, UI1window, UI1col, UI1row, UI1input } from '@/components/UI1'
const props = defineProps({
  page: String,
  title: String
})

const input = reactive({
  input1: '',
  input2: '',
  input3: ''
})

onMounted(async () => {
  // let r = aaa({props.page})
})
</script>
<template>
  <UI1window title="邊框 UI1window"
    >簡單邊框，內部放置個元件
    <template #description> 下方為補助說明，加 "description" 屬性才會出現 </template>
  </UI1window>
  <UI1window title="按鈕 UI1button">
    <UI1button type="danger"> 按鈕 </UI1button>
    <UI1button type="primary"> 按鈕2 </UI1button>
    <UI1button type="warning"> 按鈕3 </UI1button>
    <UI1button> 預設 </UI1button>
    <template #description> 按鈕目前只可以改變顏色...，按鈕內直接使用元素自訂 </template>
  </UI1window>
  <UI1window title="排版 UI1row / UI1col">
    <UI1row>
      <UI1col span="24" class="p-1 bg-red">24</UI1col>
      <UI1col span="12" class="p-1 bg-green">12</UI1col>
      <UI1col span="6" class="p-1 bg-blue">6</UI1col>
      <UI1col span="3" class="p-1 bg-pink">3</UI1col>
      <UI1col span="1" class="p-1 bg-green">1</UI1col>
      <UI1col span="12" class="p-1 bg-gray">12</UI1col>
      <UI1col span="6" class="p-1 bg-red">6</UI1col>
      <UI1col span="3" class="p-1 bg-blue">3 + padding 1rem</UI1col>
      <UI1col span="3" class="p-1 bg-yellow">3</UI1col>
      <UI1col span="12" class="p-1 bg-gray">12</UI1col>
      <UI1col span="6" class="p-1 bg-red">6</UI1col>
      <UI1col span="3" boxSizing class="p-1 bg-blue">3 + padding 1rem</UI1col>
      <UI1col span="3" class="p-1 bg-yellow">3</UI1col>
      <UI1col span="10" class="p-1 bg-green">10</UI1col>
    </UI1row>
    <template #description>
      分成24等分，可以排版,超過會錯位至下一行。<br />
      預設 box-sizing 屬性為 content-box， padding 不會影響排版，margging 還是會。<br />
      加入 "boxSizing" 屬性並為 "false" 將會變成 "border-box" 。
    </template>
  </UI1window>
  <UI1window title="輸入框 UI1input">
    <UI1input class="mb-2" v-model="input.input1" title="標題1" />
    <UI1input class="mb-2" v-model="input.input2" placeholder="輸入提示1" />
    <UI1input class="mb-2" v-model="input.input3" placeholder="輸入提示2" title="標題2" />
    <template #description>
      <div class="mb-5">
        在元素中加入'title'屬性來定義輸入框標題<br />
        <span class="color-blue"
          >< UI1input class="mb-2" v-model="input.input1" title="標題1" / ></span
        ><br />
      </div>
      <div class="mb-5">
        在元素中加入'placeholder'屬性來定義輸入框提示<br />
        <span class="color-blue"
          >< UI1input class="mb-2" v-model="input.input2" placeholder="輸入提示1" / ></span
        ><br />
      </div>
      <div class="mb-5">
        在元素中加入'title' 'placeholder'同時輸入則標題會固定在左上方<br />
        <span class="color-blue"
          >< UI1input class="mb-2" v-model="input.input3" placeholder="輸入提示2" title="標題2" /
          ></span
        ><br />
      </div>
    </template>
  </UI1window>
</template>
