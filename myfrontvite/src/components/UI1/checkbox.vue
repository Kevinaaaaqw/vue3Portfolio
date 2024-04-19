<script setup lang="ts">
import { computed, defineProps } from 'vue'

const model = defineModel()
const props = defineProps<{ lable?: string; size?: 'small' | 'large'; name?: string; value?: string }>()

const size = computed(() => {
    switch (props.size) {
        case 'small':
            return 'h-15px w-15px'
        case 'large':
            return 'h-30px w-30px'


        default:
            return 'h-20px w-20px'

    }
})

const value = computed(() => {
    return props.value || props.lable
})

const name = computed(() => {
    return props.name || ''
})

</script>
<template>
    <div class="flex items-center children:cursor-pointer">
        <input :id="props.lable" :name="name" :class="size" :type="'checkbox'" v-model="model" :value="value" />
        <label :for="props.lable" class="select-none">
            {{ props.lable }}
        </label>
    </div>
</template>
<style scoped>
.checkmark {
    height: 25px;
    width: 25px;
    background-color: #eee;
}
</style>
