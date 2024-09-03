<script setup lang="ts">
import { ref, inject, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const firstLayerRef = ref<HTMLElement | null>(null);
const secondLayerRef = ref<HTMLElement | null>(null);
const rect = ref<DOMRect | null>(null);

const updateRect = () => {
    secondLayerRef.value && (rect.value = secondLayerRef.value.getBoundingClientRect())
}

const secondLayerPosition = ref(' start-50% translate-x--50% ')
const toggleSecondLayer = ref(false)
const handleSecondLayer = computed(() => {
    if (!secondLayerRef.value?.childElementCount || !toggleSecondLayer.value) return 'max-h-0'
    return 'max-h-100% p-10px'
})

watch(() => rect.value, (newV, oldV) => {
    if (rect.value) {
        const { left, right, width } = rect.value;
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



setInterval(updateRect, 1000);

</script>
<template>
    <div ref="firstLayerRef">
        <div class="bg-green p-10px rounded-md cursor-pointer relative duration-1000"
            @click="toggleSecondLayer = !toggleSecondLayer">
            第一層
        </div>
        <div ref="secondLayerRef"
            class="min-w-full absolute bg-red rounded-md bottom-0 translate-y-100% box-border overflow-hidden duration-300"
            :class="[secondLayerPosition, handleSecondLayer]">
            <div class="w-100">
                第二層第二層第二層
                第二層第二層第二層
            </div>
        </div>
    </div>
</template>
{
柏勳:1?,
棟樑:1,
顧問:0,
秉叡:0(上週吃過),
景致:0,
}