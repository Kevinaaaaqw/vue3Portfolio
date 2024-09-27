<script setup lang="ts">
import { ref, reactive, inject, computed, watch } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
</script>
<template>
    <div class="w-full flex flex-col gap-10 justify-center bg-slate_green_pale">
        <div class="container accent-black flex flex-col items-center min-h-100dvh gap-4 md-gap-10 box-border">
            <div class="text-4xl md-text-6xl md-mb-5 font-bold">
                作品介紹
            </div>
            <div class="md-text-xl text-center line-height-normal">
                在這份作品集中，我展示了我在前端開發中使用的技能。每個作品的介紹中，將詳細說明其核心功能和技術細節，讓您更了解我在每個專案中的技術使用與挑戰解決過程。
            </div>
            <div
                class="flex-wrap md-flex-nowrap bg-beige_mist w-full flex justify-between shadow-xl box-border gap-50px">
                <div class="flex-grow flex flex-col gap-8">
                    <router-link :to="{ name: 'project3Search' }" target="_blank"
                        class="w-full h-fit md-mt-8 button_bg_slide">
                        <div class="border-s-10 border-solid border-steel_blue h-fit text-2xl px-4 py-2">
                            <div class="font-bold">
                                OMDb 電影搜尋
                            </div>
                            <div class="font-bold text-lg flex justify-between text-black">
                                <div>
                                    可供搜尋電影 (英文名稱)
                                </div>
                                <div class="text-sm flex items-center md-hidden font-normal">...前往網站</div>
                            </div>
                        </div>
                    </router-link>
                    <div class="px-6 line-height-normal flex flex-col gap-4">
                        <div>
                            串接 <a class="text-blue hover:text-red underline_expand" href="https://www.omdbapi.com/"
                                target="_blank">OMDb API</a> 提供影片搜尋、加入口袋片單功能
                        </div>
                        <div class="grid ">
                            <ul
                                class="ps-4 list-disc [&>li]:mb-4 [&>li>div]:font-bold [&>li>div]:mb-3 [&>li>ul]:ps-4 [&>li>ul_div]:text-sm [&>li>ul]:list-circle [&>li>ul>li]:line-height-8">
                                <li>
                                    <div>使用技術：</div>
                                    <ul class="[&>li>div]:ps-4">
                                        <li>pinia 持久化( 存入localStorage )</li>
                                        <li>API 串接</li>
                                        <li>element-plus (vue 框架套件)</li>
                                    </ul>
                                </li>
                            </ul>
                            <ul
                                class="ps-4 list-disc [&>li]:mb-4 [&>li>div]:font-bold [&>li>div]:mb-3 [&>li>ul]:ps-4 [&>li>ul_div]:text-sm [&>li>ul]:list-circle [&>li>ul>li]:line-height-8">
                                <li>
                                    <div>功能實現：</div>
                                    <ul class="[&>li>div]:ps-4">
                                        <li>依照電影名稱、發行年分、類型搜尋影片：
                                            <div>
                                                依照參數規格送API，資料是依照頁數回傳10筆資料，所以每切換一次頁數跑一次API
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="p-6 w-full md-max-w-400px flex justify-center h-fit overflow-hidden">
                    <img class="w-full object-contain" src="@/components/icons/ToDoListDemo.png" alt="">
                </div>
            </div>
            <div
                class="flex-wrap md-flex-nowrap bg-beige_mist w-full flex justify-between shadow-xl box-border gap-50px">
                <div class="flex-grow flex flex-col gap-8">
                    <router-link :to="{ name: 'toDoListMyTasks' }" target="_blank"
                        class="w-full h-fit md-mt-8 button_bg_slide">
                        <div class="border-s-10 border-solid border-steel_blue h-fit text-2xl px-4 py-2">
                            <div class="font-bold">
                                To Do List 作品
                            </div>
                            <div class="font-bold text-lg flex justify-between text-black">
                                <div>
                                    簡單的線上記事功能網頁
                                </div>
                                <div class="text-sm flex items-center md-hidden font-normal">...前往網站</div>
                            </div>
                        </div>
                    </router-link>
                    <div class="px-6 line-height-normal flex flex-col gap-4">
                        <div>
                            依照 <a class="text-blue hover:text-red underline_expand"
                                href="https://hexschool.github.io/THE_F2E_Design/todolist/#artboard0"
                                target="_blank">設計圖</a> 做的 to
                            do list 功能頁面，
                        </div>
                        <div class="grid ">
                            <ul
                                class="ps-4 list-disc [&>li]:mb-4 [&>li>div]:font-bold [&>li>div]:mb-3 [&>li>ul]:ps-4 [&>li>ul_div]:text-sm [&>li>ul]:list-circle [&>li>ul>li]:line-height-8">
                                <li>
                                    <div>使用技術：</div>
                                    <ul class="[&>li>div]:ps-4">
                                        <li>Vue3 組合式</li>
                                        <li>pinia 持久化( 存入localStorage )</li>
                                        <li>vuedraggable 、 UnoCSS 套件使用</li>
                                        <li>元件(Component)化</li>
                                    </ul>
                                </li>
                            </ul>
                            <ul
                                class="ps-4 list-disc [&>li]:mb-4 [&>li>div]:font-bold [&>li>div]:mb-3 [&>li>ul]:ps-4 [&>li>ul_div]:text-sm [&>li>ul]:list-circle [&>li>ul>li]:line-height-8">
                                <li>
                                    <div>功能實現：</div>
                                    <ul class="[&>li>div]:ps-4">
                                        <li>新增、編輯、刪除代辦事項：
                                            <div>
                                                任務下方會依照是否有 完成日、附件、詳細說明顯示圖示。
                                            </div>
                                        </li>
                                        <li>清單排序功能：
                                            <div>
                                                sort( )功能，將有標記星號狀態資料排序到上層，已完成狀態排序到底層，其餘不變。
                                            </div>
                                        </li>
                                        <li>拖曳功能，此處使用兩種方式：
                                            <div>
                                                引入套件(vuedraggable)後使用draggable元件，功能展示在進行中(In Progress)頁面。<br />
                                                用drag事件處理拖曳效果，用mouseenter事件對調陣列資料後再呼叫排序功能。
                                            </div>
                                        </li>
                                        <li>檔案上傳功能：
                                            <div>
                                                可上傳檔案，但本作品無連接資料庫，只存檔案名稱與上傳時間。
                                            </div>
                                        </li>
                                        <li>檔案上傳時間判斷：
                                            <div>
                                                依據檔案上傳時間判斷為幾分鐘前、幾小時前、昨天、兩天前、上傳當日。
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="p-6 w-full md-max-w-400px flex justify-center h-fit overflow-hidden">
                    <img class="w-full object-contain" src="@/components/icons/ToDoListDemo.png" alt="">
                </div>
            </div>
            <div
                class="flex-wrap md-flex-nowrap bg-beige_mist w-full flex justify-between shadow-xl box-border gap-50px">
                <div class="flex-grow flex flex-col gap-8">
                    <a href="/myFront/bakery/DoBest.html" target="_blank" class="w-full h-fit md-mt-8 button_bg_slide">
                        <div class="border-s-10 border-solid border-steel_blue h-fit text-2xl px-4 py-2">
                            <div class="font-bold">
                                資策會小專成果技術展示
                            </div>
                            <div class="font-bold text-lg flex justify-between text-black">
                                <div>
                                    麵包店官方網站
                                </div>
                                <div class="text-sm flex items-center md-hidden font-normal">...前往網站</div>
                            </div>
                        </div>
                    </a>
                    <div class="px-6 line-height-normal flex flex-col gap-4">
                        <div>
                            本作品是資展國際前端就業養成班的在學期間作品，旨在測試是否能夠運用基本的 HTML、CSS 和 JavaScript 製作靜態頁面。開發過程大約持續了 40 小時，
                        </div>
                        <div class="grid ">
                            <ul
                                class="ps-4 list-disc [&>li]:mb-4 [&>li>div]:font-bold [&>li>div]:mb-3 [&>li>ul]:ps-4 [&>li>ul_div]:text-sm [&>li>ul]:list-circle [&>li>ul>li]:line-height-8">
                                <li>
                                    <div>使用技術：</div>
                                    <ul class="[&>li>div]:ps-4">
                                        <li>基本 HTML 運用</li>
                                        <li>Bootstrap 5 CSS 框架</li>
                                        <li>基本 RWD 切版</li>
                                        <li>JavaScript 基本運用</li>
                                    </ul>
                                </li>
                            </ul>
                            <ul
                                class="ps-4 list-disc [&>li]:mb-4 [&>li>div]:font-bold [&>li>div]:mb-3 [&>li>ul]:ps-4 [&>li>ul_div]:text-sm [&>li>ul]:list-circle [&>li>ul>li]:line-height-8">
                                <li>
                                    <div>功能實現：</div>
                                    <ul class="[&>li>div]:ps-4">
                                        <li>菜單展開與登入流程處理</li>
                                        <li>輪播圖：
                                            <div>
                                                Bootstrap 5 框架運用
                                            </div>
                                        </li>
                                        <li>登入操作錯誤時提示</li>
                                        <li>錯誤次數過多的懲罰時間：
                                            <div>
                                                輸入錯誤就加 count，達滿 3 次就進入懲罰時間，使用 setTimeout 倒數，歸零時重製錯誤次數。
                                            </div>
                                        </li>
                                        <li>帳號和密碼輸入框獲得焦點時修改 CSS：
                                            <div>
                                                使用 trim() 判斷內容是否有值，根據 focus 狀態修改 CSS 參數，達成類似 Google 登入框的效果。
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <ul
                                class="ps-4 list-disc [&>li]:mb-4 [&>li>div]:font-bold [&>li>div]:mb-3 [&>li>ul]:ps-4 [&>li>ul_div]:text-sm [&>li>ul]:list-circle [&>li>ul>li]:line-height-8">
                                <li>
                                    <div>素材處理：</div>
                                    <ul class="[&>li>div]:ps-4">
                                        <li>使用 Photoshop 處理圖片素材
                                            <div>
                                                簡單的圖片去背、裁切以及圖片素材結合利用
                                            </div>
                                        </li>
                                        <li>使用 Figma 規劃網站設計</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="p-6 w-full md-max-w-400px flex justify-center h-fit overflow-hidden">
                    <img class="w-full object-contain" src="@/components/icons/backeryDemo.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
