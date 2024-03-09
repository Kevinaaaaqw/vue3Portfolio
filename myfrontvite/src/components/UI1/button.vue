<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{ type?: 'primary' | 'danger' | 'warning' }>()

const buttonType = computed(() => {
  let bgColor = ''
  switch (props.type) {
    case 'primary':
      bgColor = 'primary'
      break
    case 'danger':
      bgColor = 'danger'

      break
    case 'warning':
      bgColor = 'warning'
      break

    default:
      bgColor = 'white'
      break
  }
  return 'ms-1 me-1 ps-4 pe-4 pt-2 pb-2 b-rd ' + bgColor
}) 
</script>
<template>
  <button :class="buttonType"><slot>按鈕</slot></button>
</template>
<style scoped>
.primary {
  background-color: #369de8;
  border: none;
}
.primary:hover {
  background-color: #369ee88d;
  border: none;
  cursor: pointer;
}
.danger {
  background-color: #f01010;
  border: none;
}
.danger:hover {
  background-color: rgba(240, 16, 16, 0.5);
  border: none;
  cursor: pointer;
}
.warning {
  background-color: #ffa600;
  border: none;
}
.warning:hover {
  background-color: #ffa6008d;
  border: none;
  cursor: pointer;
}
.white {
  background-color: #ffffff;
  border: solid rgba(0, 0, 0, 0.183) 1px;
}
.white:hover {
  background-color: #0dcae711;
  cursor: pointer;
}
</style>
