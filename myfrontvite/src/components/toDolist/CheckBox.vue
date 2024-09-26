<script setup lang="ts">
import { computed, ref, onMounted, type Ref } from 'vue';

const model: Ref = defineModel()
const props = defineProps<{ size?: 'sm' | 'md' | 'lg', label?: string; }>()

//大小樣式
const checkboxClass = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'w-12px h-12px m-0 p-0';
        case 'md':
            return 'w-24px h-24px m-0 p-0';
        case 'lg':
            return 'w-36px h-36px m-0 p-0';
        default:
            return 'w-24px h-24px m-0 p-0';
    }
})

//大小樣式
const checkmarkClass = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'after:w-3px after:h-6px after:border-solid after:border-white after:border-s-0 after:border-t-0 after:border-e-1px after:border-b-1px';
        case 'md':
            return 'after:w-6px after:h-12px after:border-solid after:border-white after:border-s-0 after:border-t-0 after:border-e-3px after:border-b-3px';
        case 'lg':
            return 'after:w-9px after:h-18px after:border-solid after:border-white after:border-s-0 after:border-t-0 after:border-e-5px after:border-b-5px';
        default:
            return 'after:w-6px after:h-12px after:border-solid after:border-white after:border-s-0 after:border-t-0 after:border-e-3px after:border-b-3px';
    }
})

//勾選樣式
const checkedBg = computed(() => {
    if (model.value) return 'checkmark'
    return ' bg-bg-4 hover:bg-bg-6'
})

//字體大小
const fontFamily = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'paragraph';
        case 'md':
            return 'subtitle';
        case 'lg':
            return 'title';
        default:
            return 'subtitle';
    }
})


</script>
<template>
    <label class="flex items-center cursor-pointer">
        <div :class="checkboxClass + ' relative bg-red'">
            <input v-model="model" type="checkbox" class="absolute w-0 h-0">
            <span :class="`${checkboxClass} ${checkedBg} ${checkmarkClass} absolute top-0 left-0`"></span>
        </div>
        <span :class="`${fontFamily} ms-3`"> {{ props.label }}</span>
    </label>
</template>
<style>
.checkmark {
    background-color: var(--base)
}

.checkmark:after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%) rotate(45deg);
}
</style>