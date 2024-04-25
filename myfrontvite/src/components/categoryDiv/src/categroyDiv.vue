<script setup lang="ts">
const props = defineProps<{ img?: string, categoryName?: string, introdece?: string, src?: string }>()

</script>
<template>
    <div class="w-450px h-450px m-3 border-solid border-1px border-base rd-1 cursor-pointer">
        <div class="w-full h-270px bg-sub/10">
            <img v-if="props.src" :src="props.src" alt="" class="w-full h-full object-contain " loading="lazy">
        </div>
        <div class="border-1px border-b-solid border-base"></div>
        <div class="w-full h-180px">
            <div class="ms-2 me-2">
                <h2>{{ props.categoryName }}</h2>
            </div>
            <div class=" ms-2 me-2">
                <h3>{{ props.introdece }}</h3>
            </div>
        </div>
    </div>
</template>