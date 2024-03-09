<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{ description?: string; title?: string }>()

const description = ref(null)
</script>
<template>
  <div class="margin-1rem">
    <slot name="title">
      <h3>
        {{ props.title }}
      </h3>
    </slot>
    <div class="border b-rd">
      <div class="padding-1rem">
        <slot> </slot>
      </div>
      <div class="border-b" v-if="!description"></div>
      <div :class="!description && 'padding-1rem'">
        <slot name="description">
          <div ref="description">
            {{ props.description }}
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.border {
  border: solid rgba(74, 74, 74, 0.437) 1px;
}
.border-b {
  border-bottom: solid rgba(74, 74, 74, 0.437) 1px;
}
.margin-1rem {
  margin: 0.5rem;
}
.b-rd {
  border-radius: 0.25rem;
}

.padding-1rem {
  padding: 1rem;
}
.s {
  display: grid;
  grid-template-columns: 1;
}
</style>
