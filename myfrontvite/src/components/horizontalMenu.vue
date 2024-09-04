<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
const firstLayerRef = ref<HTMLElement | null>(null);
const secondLayerRect = ref<DOMRect | null>(null);
const updateRect = () => {
    firstLayerRef.value && (secondLayerRect.value = firstLayerRef.value.getBoundingClientRect())
    secondLayerRef.value && (thirdLayerRect.value = secondLayerRef.value.getBoundingClientRect())
}

const secondLayerRef = ref<HTMLElement | null>(null);
const thirdLayerRect = ref<DOMRect | null>(null);
const thirdLayerPosition = ref('end-0 translate-x-100%')
const toggleThirdLayer = ref(false)
const handleThirdLayer = computed(() => {
    if (!secondLayerRef.value?.textContent?.trim() || !toggleThirdLayer.value) return 'max-w-0 overflow-hidden'
    return 'max-w-100% p-10px'
})
watch(() => thirdLayerRect.value, (newV, oldV) => {
    if (thirdLayerRect.value) {
        const { right, width } = thirdLayerRect.value;
        const windowWidth = window.innerWidth;
        if (windowWidth - right < 0 || (thirdLayerPosition.value == 'start-0 translate-x--100%' && (secondLayerRect.value && windowWidth - secondLayerRect.value.right < width))) {
            thirdLayerPosition.value = 'start-0 translate-x--100%'
            return
        }
        thirdLayerPosition.value = 'end-0 translate-x-100%'
    }
});



setInterval(updateRect, 1000);

</script>
<template>
    <div ref="firstLayerRef" class="relative rounded-md bottom-0 duration-300">
        <div class="cursor-pointer p-10px" @click="toggleThirdLayer = !toggleThirdLayer">
            <slot name="title" />
        </div>
        <div ref="secondLayerRef"
            class="absolute shadow w-fit text-nowrap rounded-md top-0 box-border overflow-hidden duration-300"
            :class="[thirdLayerPosition, handleThirdLayer]">
            <slot />
        </div>
    </div>
</template>