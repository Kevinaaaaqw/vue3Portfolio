<script setup lang="ts">
import { ref, reactive, inject, computed, watch } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
// const elCollapse = reactive({ primaryActiveNames: ref(1), secondaryActiveNames_1: ref(1) })
const primaryActiveNames = ref(['1', '2'])
const secondaryActiveNames_1 = ref()
const secondaryActiveNames_2 = ref()
</script>
<template>
    <div class="w-full flex flex-col gap-10 justify-center bg-slate_green_pale">
        <div class="container accent-black flex flex-col items-center min-h-100dvh gap-3 sm-gap-10 box-border">
            <div class="text-4xl sm-text-6xl sm-mb-5 font-bold">
                履歷
            </div>
            <!-- 工作經歷 -->
            <div class="w-full flex flex-col items-center gap-3 sm-gap-10">
                <div class="w-full">
                    <div class="text-xl sm-text-3xl font-bold">
                        相關工作經驗
                    </div>
                    <div class="text-2xl">
                    </div>
                </div>
                <div
                    class="flex-wrap md-flex-nowrap bg-beige_mist w-full flex justify-between rounded-1 p-5 sm-p-10 shadow-xl box-border gap-50px">
                    <div class="w-full md-w-30% max-md:divider max-md:mb--32px">
                        <div class="mb-4"><span class="text-blue text-xl font-bold">2024.6 - 2024.9</span></div>
                        <div class="text-xl mb-4">台中市</div>
                        <div class="mb-4 font-bold">創創數位科技股份有限公司</div>
                        <div class="">408台中市南屯區文心路一段186號20F</div>
                    </div>
                    <div class="w-full md-w-70% line-height-normal pt-1rem">
                        主要負責 MVC 架構專案中的前端切版與套版工作，專案技術使用 PHP Laravel 7 和 jQuery。<br /><br />

                        針對純讀取資料頁面，通過 URL 參數由 Controller 取得資料，並直接以 PHP 渲染到頁面上。對於動態搜尋功能，使用 $.ajax
                        發送請求，成功回應後會檢查資料類型以防止錯誤，然後使用
                        .empty() 和 .append() 更新目標元素；若請求失敗，則顯示錯誤訊息。為防止重複提交請求，採用 jqXHR.abort() 中斷多次請求。<br />

                        另外有協助處理無障礙功能 A 級檢測，透過 freego 工具掃描並修正問題，完成後提交進行人工審核。
                    </div>
                </div>
                <div
                    class="flex-wrap md-flex-nowrap bg-beige_mist w-full flex justify-between rounded-1 p-5 sm-p-10 shadow-xl box-border gap-50px">
                    <div class="w-full md-w-30% max-md:divider max-md:mb--32px">
                        <div class="mb-4"><span class="text-blue text-xl font-bold">2023.9 - 2024.5</span></div>
                        <div class="text-xl mb-4">台中市</div>
                        <div class="mb-4 font-bold">天方科技實業股份有限公司</div>
                        <div class=""> 408台中市南屯區萬和路一段37號</div>
                    </div>
                    <div class="w-full md-w-70% line-height-normal pt-1rem">
                        負責大學校務系統的前端開發，主要使用 Vue 3、Element Plus UI 框架以及 UnoCSS CSS 框架，進行畫面切版和套版。<br />
                        <br />
                        在切版方面，我根據系統分析師與 UI/UX 設計師提供的 Figma
                        原型圖與規格書進行開發。先行刻畫版面並預插欄位，待後端串接資料後再進行調整。若遇到操作流程或資料結構的問題，我會及時與設計師確認是否需要修改或調整設計。<br />
                        <br />
                        在 API 串接上，根據後端提供的參數規格，我會使用 Postman 測試，或使用後端專案（C#）的 Swagger 工具來查找 API。<br />
                        <br />
                        語法層面，使用了多種語法糖以提高程式可讀性與效率。透過 async/await 處理需等待回應的 API 請求，避免巢狀結構過深；使用物件與陣列解構賦值來簡化資料操作；對陣列資料使用 map
                        方法來提取、修改特定資料，並對需要特殊處理的資料進行額外運算。此外，三元運算符、?? 以及可選鏈操作符（?.）進一步提升程式碼的可讀性與可維護性。
                    </div>
                </div>
            </div>
            <!-- 求學經歷 -->
            <div class="w-full flex flex-col items-center gap-3 sm-gap-10">
                <div class="w-full">
                    <div class="text-3xl font-bold">
                        學習經歷
                    </div>
                    <div class="text-2xl">

                    </div>
                </div>
                <div
                    class="flex-wrap md-flex-nowrap bg-beige_mist w-full flex justify-between rounded-1 p-5 sm-p-10 shadow-xl box-border gap-50px">
                    <div class="w-full md-w-30% max-md:divider max-md:mb--32px">
                        <div class="mb-4"><span class="text-blue text-xl font-bold">2023.3 - 2023.8</span></div>
                        <div class="text-xl mb-4">資展國際 前端就業養成班</div>
                        <!-- <div class="mb-4 font-bold"></div> -->
                        <div class="">台中市南屯區公益路二段51號18樓</div>
                    </div>
                    <div class="w-full md-w-70% line-height-normal pt-1rem">
                        學習了基礎的網頁影像視覺處理、HTML 和 CSS 布局編寫，掌握了使用 Bootstrap CSS 框架進行響應式網頁設計（RWD）。熟悉 React 18、PHP 和 MySQL
                        資料庫的基礎技術。透過小型專案整合應用所學技能，並在結業專題中參與團隊合作，有機會擔任組長，負責規劃整個專案的實施過程。
                    </div>
                </div>
                <div
                    class="flex-wrap md-flex-nowrap bg-beige_mist w-full flex justify-between rounded-1 p-5 sm-p-10 shadow-xl box-border gap-50px">
                    <div class="w-full md-w-30% max-md:divider max-md:mb--32px">
                        <div class="mb-4"><span class="text-blue text-xl font-bold">2016.9 - 2020.7</span></div>
                        <div class="text-xl mb-4">中國文化大學</div>
                        <div class="mb-4 font-bold">園藝暨生物技術學系 學士</div>
                        <div class="">臺北市11114陽明山華岡路55號</div>
                    </div>
                    <div class="w-full md-w-70% line-height-normal pt-1rem">
                        進行有關土壤鹽鹼化對植物影響及生物炭施用對鹽鹼土壤中植物產量與品質影響的實驗論文研究與資料蒐集。<br /><br />
                        實習期間，協助農業改良場進行穀類食物加工方法與抗性澱粉生成的相關研究。<br /><br />
                        擔任三屆大莊館宿舍館長，指揮幹部以及處理住宿生事務，並協助校方舉辦防災演練與座談會等活動。
                    </div>
                </div>
            </div>
            <!-- 相關證照 -->
            <div class="w-full flex flex-col items-center gap-3 sm-gap-10">
                <div class="bg-beige_mist w-full flex flex-col p-10 shadow-xl box-border gap-40px">
                    <el-collapse v-model="primaryActiveNames"
                        class="[&_.el-collapse-item\_\_header]:bg-beige_mist [&_.el-collapse-item\_\_header]:text-start  [&_.el-collapse-item\_\_header]:h-fit [&_.el-collapse-item\_\_header]:mb-4 [&_.el-collapse-item\_\_content]:bg-beige_mist">
                        <el-collapse-item name="1" class="[&>button]:transition-300 hover:[&>button]:text-blue">
                            <template #title>
                                <div class="text-xl sm-text-3xl font-bold">
                                    相關證照
                                </div>
                            </template>
                            <el-collapse class="ps-4" v-model="secondaryActiveNames_1" accordion>
                                <el-collapse-item name="1" class="[&>button]:transition-300 hover:[&>button]:text-blue">
                                    <template #title>
                                        <div class="text-lg sm-text-2xl">ITS 網路安全管理核心能力</div>
                                    </template>
                                    <div><img class="w-full max-w-400px object-contain"
                                            src="@/components/icons/information_technology_specialist.png"
                                            alt="網路安全管理核心能力證照圖">
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item name="2" class="[&>button]:transition-300 hover:[&>button]:text-blue">
                                    <template #title>
                                        <div class="text-lg sm-text-2xl">Cisco_CCST</div>
                                    </template>
                                    <div><img class="w-full max-w-400px object-contain"
                                            src="@/components/icons/Cisco_CCST.png" alt="網路安全管理核心能力證照圖">
                                    </div>
                                </el-collapse-item>

                            </el-collapse>
                        </el-collapse-item>
                        <el-collapse-item name="2" class="[&>button]:transition-300 hover:[&>button]:text-blue">
                            <template #title>
                                <div class="text-xl sm-text-3xl font-bold">
                                    程式語言與技能
                                </div>
                            </template>
                            <el-collapse class="ps-4" v-model="secondaryActiveNames_2" accordion>
                                <el-collapse-item name="1" class="[&>button]:transition-300 hover:[&>button]:text-blue">
                                    <template #title>
                                        <div class="text-lg sm-text-xl">Vue 3 組合式</div>
                                    </template>
                                    <div class="ps-4 sm-text-lg">
                                        <ul
                                            class="[&>li]:mb-4 [&>li>div]:font-bold [&>li>div]:mb-3 [&>li>ul]:ps-4 [&>li>ul]:list-circle [&>li>ul>li]:line-height-8">
                                            <li>
                                                <div>初級：掌握 Vue 的基本概念，能夠創建簡單的專案</div>
                                                <ul>
                                                    <li>理解 Vue 3 的基礎架構與功能。</li>
                                                    <li>能使用 Vue CLI 或 Vite 建立與運行 Vue 3 項目。</li>
                                                    <li>掌握模板語法：例如 {{}} 表達式、v-bind、v-model、v-if、v-for 等指令。</li>
                                                    <li>能處理基本事件：如使用 v-on 或其縮寫 @ 監聽事件。</li>
                                                    <li>瞭解組件基礎：能創建並使用簡單的 Vue 組件。</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <div>中級：能夠處理組件通信、路由和 API 整合，構建複雜的單頁應用。</div>
                                                <ul>
                                                    <li>了解父子組件間的數據傳遞，掌握 props 和 emit。</li>
                                                    <li>能運用 Vue 3 的響應式系統，使用 ref()、reactive()，並理解 computed 和 watch。</li>
                                                    <li>能運用 Vue Router 實現路由管理，處理多頁面跳轉。</li>
                                                    <li>掌握狀態管理工具如 Pinia，管理全局狀態。</li>
                                                    <li>了解 Vue 3 的生命周期鉤子，如 onMounted()、onUpdated()、onUnmounted()。</li>
                                                    <li>能使用 Composition API（如 setup()）來重構代碼，分離邏輯。</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <div>高級：能夠設計可重用的組件，進行性能優化。</div>
                                                <ul>
                                                    <li>初步了解高級組件設計模式，如動態組件、插槽及作用域插槽。</li>
                                                    <li>能創建 Vue 插件，並使用簡單的全局混入來擴展功能。</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item name="2" class="[&>button]:transition-300 hover:[&>button]:text-blue">
                                    <template #title>
                                        <div class="text-lg sm-text-xl">React</div>
                                    </template>
                                    <div class="ps-4 sm-text-lg">
                                        <ul
                                            class="[&>li]:mb-4 [&>li>div]:font-bold [&>li>div]:mb-3 [&>li>ul]:ps-4 [&>li>ul]:list-circle [&>li>ul>li]:line-height-8">
                                            <li>
                                                <div>初級：掌握 React 基礎概念、JSX 語法、狀態管理和事件處理，能夠構建簡單的應用。</div>
                                                <ul>
                                                    <li>理解函數式和類組件，並使用 props 傳遞數據。</li>
                                                    <li>掌握 state 的使用，管理組件內部狀態。</li>
                                                    <li>能處理基本事件（如 onClick、onChange）。</li>
                                                    <li>能進行條件渲染（使用三元運算符或 &&）。</li>
                                                    <li>熟悉列表渲染，使用 .map() 並正確處理 key 屬性。</li>
                                                    <li>掌握基礎 Hooks，如 useState 和 useEffect。</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <div>中級：掌握組件生命周期、上下文 API、路由管理和表單處理，能夠構建多頁面、狀態驅動的應用。</div>
                                                <ul>
                                                    <li>能初步將組件結構拆分為小組件。</li>
                                                    <li>能運用 React Router 實現路由導航，構建多頁應用。</li>
                                                    <li>初步了解 Context API，避免 props drilling。</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item name="3" class="[&>button]:transition-300 hover:[&>button]:text-blue">
                                    <template #title>
                                        <div class="text-lg sm-text-xl">TypeScript</div>
                                    </template>
                                    <div class="ps-4 sm-text-lg">
                                        <ul
                                            class="[&>li]:mb-4 [&>li>div]:font-bold [&>li>div]:mb-3 [&>li>ul]:ps-4 [&>li>ul]:list-circle [&>li>ul>li]:line-height-8">
                                            <li>
                                                <div>初級：掌握 TypeScript 的基本語法和類型。</div>
                                                <ul>
                                                    <li>基本語法：了解基本的 TypeScript 語法，包括變量、數據類型（如
                                                        string、number、boolean）和簡單的函數。</li>
                                                    <li>基本類型：能夠使用基本類型來定義變量，理解聯合類型（Union Types）</li>
                                                    <li>
                                                        簡單接口：能夠創建簡單的接口（interface）並使用它們來描述對象的形狀。
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <div>中級：能夠使用進階類型和泛型，了解類和繼承。</div>
                                                <ul>
                                                    <li>進階類型：理解進階類型，如元組（Tuple）、類型別名（Type Aliases）和映射類型（Mapped Types）。
                                                    </li>
                                                    <li>類和繼承：知道類（class）和繼承，理解構造函數、方法和訪問修飾符（public、private、protected）。
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item name="4" class="[&>button]:transition-300 hover:[&>button]:text-blue">
                                    <template #title>
                                        <div class="text-lg sm-text-xl">JavaScript 語法糖</div>
                                    </template>
                                    <div class="ps-4 sm-text-lg">
                                        <ul
                                            class="[&>li]:mb-4 [&>li>div]:font-bold [&>li>div]:mb-3 [&>li>ul]:ps-4 [&>li>ul]:list-circle [&>li>ul>li]:line-height-8">
                                            <li>
                                                <div>初級：掌握基本的語法糖，能夠使用簡單範例。</div>
                                                <ul>
                                                    <li>基本語法糖理解：能夠識別並使用基本的語法糖，如模板字面量(``)和簡單的箭頭函數(()=>{})。</li>
                                                    <li>簡單範例：能夠寫出使用箭頭函數的簡單範例，並理解其與傳統函數的差異。</li>
                                                    <li>
                                                        了解模塊化：能夠識別 ES6 的模塊導入與導出語法（import 和 export）。
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <div>中級：能夠使用解構賦值、默認參數和 Promise，理解進階箭頭函數。</div>
                                                <ul>
                                                    <li>
                                                        進階箭頭函數：理解箭頭函數的上下文綁定特性，並能在回調函數中正確使用它。
                                                    </li>
                                                    <li>
                                                        解構賦值：能夠使用解構賦值來快速提取數組和對象的值 const { a , b } = group。
                                                    </li>
                                                    <li>
                                                        默認參數和擴展運算符：熟悉默認參數的使用，能夠使用擴展運算符來處理數組和對象。(number = 1) => {
                                                        console.log(number) } ; const combinedArray = [...arr1,
                                                        ...arr2];
                                                    </li>
                                                    <li>
                                                        理解 Promise 語法糖：能夠使用 Promise 和 async/await 來處理異步操作。
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <div>高級：了解進階解構賦值和模塊化，能夠進行性能優化。</div>
                                                <ul>
                                                    <li>
                                                        進階解構賦值：能夠使用解構賦值的進階特性，如重命名變量和設定默認值。
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item name="5" class="[&>button]:transition-300 hover:[&>button]:text-blue">
                                    <template #title>
                                        <div class="text-lg sm-text-xl">專案架構</div>
                                    </template>
                                    <div class="ps-4 sm-text-lg">
                                        <ul
                                            class="[&>li]:mb-4 [&>li>div]:font-bold [&>li>div]:mb-3 [&>li>ul]:ps-4 [&>li>ul]:list-circle [&>li>ul>li]:line-height-8">
                                            <li>
                                                <div>初級：能夠理解和設定基本的 package.json 和 tsconfig.json。</div>
                                                <ul>
                                                    <li>理解 package.json 的基本結構，包括名稱、版本、描述等欄位</li>
                                                    <li>能夠安裝和卸載簡單的 npm 套件，並查看 dependencies 和 devDependencies 的差異。</li>
                                                    <li>
                                                        理解 tsconfig.json 的基本結構，能夠識別 compilerOptions 和 include 等基本欄位。
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <div>中級：能夠管理基本的包和編譯範圍。</div>
                                                <ul>
                                                    <li>理解 exclude 和 include 的使用，並能夠調整 TypeScript 的編譯範圍。</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </el-collapse-item>

                            </el-collapse>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <!-- 波浪特效 -->
        <div class="w-full h-250px relative overflow-hidden bg-deep_slate_green mb--100px">
            <div class="wave"></div>
            <div class="wave_2"></div>
        </div>
    </div>
</template>
