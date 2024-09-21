<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue'
</script>
<template>
    <div class="flex w-full items-center justify-center gradient min-h-100dvh font-noto">
        <div class="flex flex-wrap md-flex-nowrap justify-center gap-10 md-gap-5 w-full px-5">
            <div
                class="w-full md-w-40% max-w-400px aspect-[300/400] bg-slate_green_pale flex flex-col gap-6 shadow items-center rounded">
                <img class="mt-40px max-w-50 w-100% object-cover aspect-square rounded-full object-[0px_0px]"
                    src="@/components/icons/1158433.jpg" alt="個人相片">
                <div class="text-center font-bold text-4xl">黃凱群</div>
                <div class="w-40px border-b-[3px] b-solid border-light_lavender"></div>
                <div class="text-center text-2xl">前端工程師</div>
                <div class="flex-grow-1 w-full flex flex-col justify-end">
                    <div class="bg-beige_mist flex justify-center p-2">
                        <!-- <a href="https://www.instagram.com/kevin19970908/" target="block">
                            <i class="fa-brands fa-instagram fa-2x"></i>
                        </a> -->
                        <a href="https://www.linkedin.com/in/凱群-黃-8ba411304" target="block">
                            <i class="fa-brands fa-linkedin fa-2x"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div
                class=" bg-slate_green_pale rounded md-bg-slate_green_pale/0 text-white md-text-black w-full md-w-60% max-w-400px p-4 box-border pb-5 mb-5">
                <div class="text-6xl font-bold mb-6">你好</div>
                <div class="text-xl font-bold mb-6">這是我的履歷</div>
                <div class="w-full flex gap-4 mb-15">
                    <router-link :to="{ name: 'portfolioWorkExperience' }">
                        <div
                            class="btn border-deep_slate_green border-1 border-solid hover:text-blue hover:border-blue">
                            工作經歷
                        </div>
                    </router-link>
                    <router-link to="/">
                        <div class="btn bg-base text-white hover:bg-deep_slate_green/50">作品集</div>
                    </router-link>
                </div>
                <div class="text-lg w-full line-height-normal">
                    喜歡思考、分析問題後找出解決的方法，將事情按步驟處理，決定好目標就會盡力去完成。
                    <br />
                    <br />
                    身為一位 junior 正不斷的學習精進自己。
                </div>
            </div>
        </div>
    </div>
</template>
