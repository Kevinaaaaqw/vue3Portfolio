<script setup lang="ts">
import { ref, reactive, inject, computed, watch } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
</script>
<template>
    <div class="w-full flex flex-col gap-10 justify-center bg-slate_green_pale">
        <div class="container accent-black flex flex-col items-center min-h-100dvh gap-10 box-border">
            <div class="text-6xl mb-5">
                作品介紹
            </div>
            <a href="/myFront/bakery/DoBest.html" target="_blank">456</a>
            <!-- 工作經歷 -->
        </div>
        <!-- 波浪特效 -->
        <!-- <div class="w-full h-250px relative overflow-hidden bg-deep_slate_green mb--100px">
                <div class="wave"></div>
                <div class="wave_2"></div>
            </div> -->
    </div>
</template>
