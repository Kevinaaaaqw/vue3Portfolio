<script setup lang="ts">
import { ref, inject, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

</script>
<template>
    <div class="flex justify-between shadow box-border bg-beige_mist">
        <div>
            <slot name="logo" />
        </div>
        <div class="flex gap-2">
            <slot />
        </div>
    </div>
</template>