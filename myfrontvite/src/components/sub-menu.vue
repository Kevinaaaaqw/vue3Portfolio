<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ show?: boolean }>()

watch(() => props.show, (newV) => {
    toggleSecondLayer.value = newV;
})

const emit = defineEmits<{
    (event: 'update:show', value: boolean): void
}>();

const secondLayerRef = ref<HTMLElement | null>(null);
const secondLayerRect = ref<DOMRect | null>(null);
const secondLayerPosition = ref(' start-50% translate-x--50% ')
const secondLayerHidden = ref('overflow-hidden')
const toggleSecondLayer = ref(props.show || false)

// 檢測第二層展開收納
const handleSecondLayer = computed(() => {
    if (!secondLayerRef.value?.textContent?.trim() || !toggleSecondLayer.value) return 'max-h-0' + ' ' + secondLayerHidden.value
    let height = `max-h-1000vh ${secondLayerHidden.value}`
    return height
})

// 調整第二層位置左中右
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
}
const updateRectTrigger = () => {
    setTimeout(() => {
        if (toggleSecondLayer.value) {
            updateRect()
            updateRectTrigger()
        }
    }, 100)
}

watch(toggleSecondLayer, (newV) => {
    if (newV) {
        updateRectTrigger()
        setTimeout(() => {
            secondLayerHidden.value = ''
        }, 300);
    }
    else {
        secondLayerHidden.value = 'overflow-hidden'
    }
})


const toggle = () => {
    const newValue = !toggleSecondLayer.value;
    toggleSecondLayer.value = newValue;
    emit('update:show', newValue);
}

</script>
<template>
    <div class="relative">
        <div v-if="$slots.title" class="p-10px rounded-md cursor-pointer" @click="toggle">
            <slot name="title" />
        </div>
        <div v-if="$slots.default" ref="secondLayerRef"
            class="min-w-full text-nowrap shadow absolute rounded-md bottom-0 translate-y-100% box-border duration-300 ease-in-out"
            :class="[secondLayerPosition, handleSecondLayer]">
            <slot />
        </div>
    </div>
</template>