<script setup lang="ts">
import { ref, inject, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

</script>
<template>
    <div class="relative hover:text-deep_slate_green p-10px duration-300">
        <slot />
    </div>
</template>