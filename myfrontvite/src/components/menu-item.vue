<script setup lang="ts">
import { ref, inject, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

</script>
<template>
    <div class="relative">
        <slot />
    </div>
</template>