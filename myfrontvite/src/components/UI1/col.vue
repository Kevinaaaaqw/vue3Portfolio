<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ span: number | string; boxSizing?: boolean }>()

const span = computed(() => {
  let n = 1
  if (typeof props.span === 'number') {
    n = Math.floor(props.span)
  } else if (typeof props.span === 'string' && !isNaN(parseInt(props.span))) {
    n = Math.floor(parseInt(props.span))
  }
  return `${(100 / 24) * n || 24}%`
})

const boxSizing = computed(() => {
  if (props.boxSizing === undefined || props.boxSizing) {
    return 'content-box'
  } else {
    return 'border-box'
  }
})
</script>
<template>
  <div class="w box-borderbox">
    <slot></slot>
  </div>
</template>
<style scoped>
.w {
  width: v-bind(span);
}
.box-borderbox {
  box-sizing: v-bind(boxSizing);
}
</style>
