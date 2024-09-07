<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
const props = defineProps<{ show?: boolean }>()

watch(() => props.show, (newV) => {
    toggleSecondLayer.value = newV;
})

const emit = defineEmits<{
    (event: 'update:show', value: boolean): void
}>();

const firstLayerRef = ref<HTMLElement | null>(null);
const firstLayerRect = ref<DOMRect | null>(null);

const updateRect = () => {
    firstLayerRef.value && (firstLayerRect.value = firstLayerRef.value.getBoundingClientRect())
    secondLayerRef.value && (secondLayerRect.value = secondLayerRef.value.getBoundingClientRect())
}

const secondLayerRef = ref<HTMLElement | null>(null);
const secondLayerRect = ref<DOMRect | null>(null);
const secondLayerPosition = ref('end-0 translate-x-100%')
const secondLayerHidden = ref('overflow-hidden')
const secondLayerPadding = ref('')
const toggleSecondLayer = ref(props.show || false)
const handleThirdLayer = computed(() => {
    if (!secondLayerRef.value?.textContent?.trim() || !toggleSecondLayer.value) return 'max-w-0 overflow-hidden' + ' ' + secondLayerHidden.value + ' ' + secondLayerPadding.value
    return 'max-w-100vw' + ' ' + secondLayerHidden.value + ' ' + secondLayerPadding.value
})


watch(() => secondLayerRect.value, (newV, oldV) => {
    if (secondLayerRect.value) {
        const { right, width } = secondLayerRect.value;
        const windowWidth = window.innerWidth;
        if (windowWidth - right < 0 || (secondLayerPosition.value == 'start-0 translate-x--100%' && (firstLayerRect.value && windowWidth - firstLayerRect.value.right < width))) {
            secondLayerPosition.value = 'start-0 translate-x--100%'
            return
        }
        secondLayerPosition.value = 'end-0 translate-x-100%'
    }
});


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
        secondLayerPadding.value = 'p-10px'
        setTimeout(() => {
            secondLayerHidden.value = ''
        }, 500);
    }
    else {
        setTimeout(() => {
            secondLayerPadding.value = ''
        }, 500);
        secondLayerHidden.value = 'overflow-hidden'
    }
})

const toggle = () => {
    const newValue = !toggleSecondLayer.value;
    toggleSecondLayer.value = newValue;
    emit('update:show', newValue);
}
setInterval(updateRect, 100);

</script>
<template>
    <div ref="firstLayerRef" class="relative">
        <div class="cursor-pointer p-10px rounded-md bottom-0" @click="toggle">
            <slot name="title" />
        </div>
        <div ref="secondLayerRef" class="absolute shadow text-nowrap rounded-md top-0 box-border ease-in"
            :class="[secondLayerPosition, handleThirdLayer]" style="transition: max-width 500ms;">
            <slot />
        </div>
    </div>
</template>