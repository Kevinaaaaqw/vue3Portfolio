<script setup lang="ts">
import { ref } from 'vue'
// const props = defineProps<>()
</script>
<template>
  <div class="d-flex flex-wrap">
    <slot></slot>
  </div>
</template>
<style scoped>
.d-flex {
  display: flex;
}
.flex-wrap {
  flex-wrap: wrap;
}
</style>
