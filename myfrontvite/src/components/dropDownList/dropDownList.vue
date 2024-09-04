<script setup lang="ts">
import { ref, inject, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const firstLayerRef = ref<HTMLElement | null>(null);
const secondLayerRef = ref<HTMLElement | null>(null);
const secondLayerRect = ref<DOMRect | null>(null);
const secondLayerPosition = ref(' start-50% translate-x--50% ')
const toggleSecondLayer = ref(false)
const handleSecondLayer = computed(() => {
    if (!secondLayerRef.value?.textContent?.trim() || !toggleSecondLayer.value) return 'max-h-0 overflow-hidden'
    return 'max-h-100% p-10px'
})
watch(() => secondLayerRect.value, (newV, oldV) => {
    if (secondLayerRect.value) {
        const { left, right, width } = secondLayerRect.value;
        const halfWidth = width / 2;
        const windowWidth = window.innerWidth;
        // 检查左边界
        if (left < 0 || (secondLayerPosition.value === 'start-0%' && left < halfWidth)) {
            secondLayerPosition.value = 'start-0%';
            return;
        }
        // 检查右边界
        if (right > windowWidth || (secondLayerPosition.value === 'start-100% translate-x--100%' && right > windowWidth - halfWidth)) {
            secondLayerPosition.value = 'start-100% translate-x--100%';
            return;
        }
        // 默认居中
        secondLayerPosition.value = 'start-50% translate-x--50%';
    }
});

const updateRect = () => {
    secondLayerRef.value && (secondLayerRect.value = secondLayerRef.value.getBoundingClientRect())
    thirdLayerRef.value && (thirdLayerRect.value = thirdLayerRef.value.getBoundingClientRect())
}

const thirdLayerRef = ref<HTMLElement | null>(null);
const thirdLayerRect = ref<DOMRect | null>(null);
const thirdLayerPosition = ref('end-0 translate-x-100%')
const toggleThirdLayer = ref(false)
const handleThirdLayer = computed(() => {
    if (!thirdLayerRef.value?.textContent?.trim() || !toggleThirdLayer.value) return 'max-w-0 overflow-hidden'
    return 'max-w-100% p-10px'
})
watch(() => thirdLayerRect.value, (newV, oldV) => {
    if (thirdLayerRect.value) {
        const { left, right, width } = thirdLayerRect.value;
        const halfWidth = width / 2;
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
    <div ref="firstLayerRef" class="relative">
        <div class="bg-green p-10px rounded-md cursor-pointer duration-1000"
            @click="toggleSecondLayer = !toggleSecondLayer">
            <slot />
        </div>
        <div ref="secondLayerRef"
            class="min-w-full absolute bg-red rounded-md bottom-0 translate-y-100% box-border duration-300"
            :class="[secondLayerPosition, handleSecondLayer]">
            <div class="w-100" >
                <div class="w-100" @click="toggleThirdLayer = !toggleThirdLayer">
                    第二層第二層第二層
                    第二層第二層第二層
                </div>
                <div ref="thirdLayerRef"
                    class="absolute bg-yellow rounded-md top-0 box-border overflow-hidden cursor-pointer duration-300"
                    :class="[thirdLayerPosition, handleThirdLayer]">
                    第三層
                </div>
            </div>
        </div>
    </div>
</template>