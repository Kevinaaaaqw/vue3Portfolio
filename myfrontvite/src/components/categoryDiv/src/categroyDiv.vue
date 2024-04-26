<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ img?: string, categoryName?: string, introdece?: string, src?: string }>()

console.log(props.introdece)
console.log(props.introdece?.length > 200)
const text = ref()

</script>
<template>
    <div :title="props.introdece"
        class="w-450px h-450px m-3 border-solid border-1px border-base rd-1 cursor-pointer hover:border-2px hover:border-sub box-border overflow-hidden">
        <div class="w-full h-270px bg-sub/10">
            <img v-if="props.src" :src="props.src" alt="" class="w-full h-full object-contain " loading="lazy">
        </div>
        <div class="border-1px border-b-solid border-base"></div>
        <div class="w-full h-180px overflow-hidden text-ellipsis children:ms-2 children:me-2">
            <div class="">
                <h2>{{ props.categoryName }}</h2>
            </div>
            <div class="">
                <h3 class="overflow-hidden line-clamp-4 text-ellipsis">
                    {{ props.introdece }}
                </h3>
            </div>
        </div>
    </div>
</template>