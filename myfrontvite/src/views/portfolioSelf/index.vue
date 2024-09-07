<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue'
</script>
<template>
    <div class="flex w-full items-center justify-center gradient h-100dvh font-noto">
        <div class="container flex justify-between">
            <div class="w-300px aspect-[300/400] bg-slate_green_pale flex flex-col gap-4  items-center">
                <img class="mt-40px w-50 object-cover aspect-square rounded-full object-[0px_0px]"
                    src="@/components/icons/1158433.jpg" alt="個人相片">
                <div class="text-center font-bold text-2xl">黃凱群</div>
                <div class="w-40px border-b-[3px] b-solid border-light_lavender"></div>
                <div class="text-center">前端工程師</div>
                <div class="flex-grow-1 w-full flex flex-col justify-end">
                    <div class="bg-red">123</div>
                </div>
            </div>

        </div>
    </div>
</template>
