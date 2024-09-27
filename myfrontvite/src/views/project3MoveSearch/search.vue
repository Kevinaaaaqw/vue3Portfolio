<script setup lang="ts">
import { } from 'vue-router'
import { ref, inject, computed, reactive, type Ref, type CSSProperties } from 'vue'
import {
    type FormRules,
    ElForm,
    ElFormItem,
    ElCol,
    ElRow,
    ElButton,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElSelect,
    ElDialog,
    ElOption,
    ElDescriptions,
    ElDescriptionsItem,
    ElBacktop,
} from 'element-plus'
import { movieApi, type MovieSearchData, type MovieReturnData, type MovieDetails } from '@/api/project3Move'

const { movieSearch } = movieApi

const loading = ref(false)
const dialogModel2 = ref(false)
const dialogTitleName2 = ref('')
const dialogBody2 = ref('')

const buttonType8 = computed(() => (dialogTitleName2.value === '刪除' ? 'danger' : 'primary'))
//電影
const searchMovieRef = ref()
const rules = reactive<FormRules>({
    title: [
        { required: true, message: '必須輸入名稱', trigger: 'blur' },
    ],
})
const searchMovieData = ref<MovieSearchData>({
    title: '',
})
const beforeSendSearch_API_Data = ref<MovieSearchData>({
    title: '',
    page: 1
})
const returnMovieData = ref<MovieReturnData>({ Search: [], totalResults: '0', Response: '' })
const moviesPageCount = computed(() => { return Math.ceil(parseInt(returnMovieData.value.totalResults ?? 0) / 10) })
const searchMovie = async () => {
    loading.value = true
    await movieSearch({ ...beforeSendSearch_API_Data.value }).then(async (res) => {
        returnMovieData.value = res.data as MovieReturnData
        console.log(res);
    })
    loading.value = false
}
const translateMovieType = (movieType: 'movie' | 'series' | 'episode' | string) => {
    switch (movieType) {
        case 'movie':
            return '電影'
        case 'series':
            return '連續劇'
        case 'episode':
            return '劇集'

        default:
            return '未知'
    }
}
const getMovieDetail = (data: MovieDetails) => {
    movieDetails.value = { ...data }
}
const showMovieDetailDialog = ref(false)
//詳細狀態
const movieDetails = ref<MovieDetails>({
    Title: '',
    Year: '',
    imdbID: '',
    Type: '',
    Poster: '',
})

//CSS回傳區
//顏色
const headerCellStyle = (): CSSProperties => {
    return {
        backgroundColor: '#F5F7FA',
        color: '#909399'
    }
}

const cellStyle = (): CSSProperties => {
    return {
        color: '#303133',
        textAlign: 'center'
    }
}
</script>
<template>
    <div class="container">
        <el-form v-loading="loading" @submit.prevent ref="searchMovieRef" :model="searchMovieData"
            label-position="right" label-width="auto" class="flex w-100%" :rules="rules">
            <el-row class="w-full">
                <el-col class="p-2" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-form-item class="flex text-center flex-items-center mb-5 pe-3" label="電影名稱：" prop="title">
                        <el-input v-model="searchMovieData.title" />
                    </el-form-item>
                </el-col>
                <el-col class="p-2" :xs="24" :sm="6" :md="8" :lg="8" :xl="8">
                    <el-form-item class="flex text-center flex-items-center mb-5 pe-3" label="類型：" prop="type">
                        <el-select v-model="searchMovieData.type" clearable>
                            <el-option :value="'movie'" :label="'電影'" />
                            <el-option :value="'series'" :label="'連續劇'" />
                            <el-option :value="'episode'" :label="'劇集'" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col class="p-2" :xs="24" :sm="6" :md="8" :lg="8" :xl="8">
                    <el-form-item class="flex text-center flex-items-center mb-5 pe-3" label="發行年份：" prop="y">
                        <el-input v-model="searchMovieData.y" />
                    </el-form-item>
                </el-col>
                <el-col class="p-2" :span="6">
                    <el-button type="primary" @click="() => {
                        beforeSendSearch_API_Data = { ...beforeSendSearch_API_Data, ...searchMovieData, page: 1 };
                        searchMovieData.title.trim() && searchMovie();
                    }
                        ">
                        搜尋電影
                    </el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-table v-loading="loading" :header-cell-style="headerCellStyle" :cell-style="cellStyle" empty-text="查無資料"
            border class="mb-4 mt-3" :data="returnMovieData.Search ?? []">
            <el-table-column align="center" prop="Year" label="發行年份" />
            <el-table-column align="center" prop="Title" label="電影名稱" />
            <el-table-column align="center" prop="Type" width="100px" label="類型">
                <template #default="scope">
                    {{ translateMovieType(scope.row.Type) }}
                </template>
            </el-table-column>
            <el-table-column align="center" min-width="100px" label="圖片">
                <template #default="scope">
                    <img class="w-full object-contain max-h-200px" v-if="scope.row.Poster != 'N/A'"
                        :src="scope.row.Poster" alt="電影圖片">
                </template>
            </el-table-column>
            <el-table-column align="center" min-width="120px" fixed="right" prop="" label="操作">
                <template #default="scope">
                    <div class="p-1 box-border w-full flex gap-2 flex-wrap justify-center items-center">
                        <div>
                            <el-button type="warning" @click="() => {
                            }
                                ">加入蒐藏</el-button>
                        </div>
                        <div>
                            <el-button type="success" @click="(res) => {
                                getMovieDetail(scope.row)
                                showMovieDetailDialog = true
                            }
                                ">查看</el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 頁簽 -->
        <div v-loading="loading" class="w-full flex flex-justify-center mt-2">
            <el-pagination class="max-md-hidden" v-model:current-page="beforeSendSearch_API_Data.page" background
                :pager-count="11" layout="prev, pager, next,jumper,total" :page-count="moviesPageCount"
                :total="parseInt(returnMovieData.totalResults ?? 0)" @current-change="(nowPageNumber) => {
                    beforeSendSearch_API_Data.page = nowPageNumber
                    searchMovie()
                }" />
            <el-pagination small size="small" class="md-hidden" v-model:current-page="beforeSendSearch_API_Data.page"
                background :pager-count="3" layout="prev, pager, next,jumper" :page-count="moviesPageCount"
                :total="parseInt(returnMovieData.totalResults ?? 0)" @current-change="(nowPageNumber) => {
                    beforeSendSearch_API_Data.page = nowPageNumber
                    searchMovie()
                }" />
        </div>
        <el-dialog fullscreen v-model="showMovieDetailDialog">
            <template #header>
                <h3 class="text-4xl">
                    詳細資料
                </h3>
            </template>
            <el-row class="w-full flex-wrap-reverse gap-8">
                <el-col :sm="24" :md="12">
                    <el-descriptions :column="1">
                        <el-descriptions-item label="電影名稱" label-class-name="md-text-2xl" class-name="md-text-2xl">{{
                            movieDetails.Title }}</el-descriptions-item>
                        <el-descriptions-item label="發行年分" label-class-name="md-text-2xl" class-name="md-text-2xl">{{
                            movieDetails.Year }}</el-descriptions-item>
                        <el-descriptions-item label="類型" label-class-name="md-text-2xl" class-name="md-text-2xl">{{
                            movieDetails.Type }}</el-descriptions-item>
                        <el-descriptions-item label="imdbID" label-class-name="md-text-2xl" class-name="md-text-2xl">{{
                            movieDetails.imdbID }}</el-descriptions-item>
                    </el-descriptions>
                </el-col>
                <el-col :sm="24" :md="12" class="flex justify-center">
                    <img class="w-full object-contain max-w500px" v-if="movieDetails.Poster != 'N/A'"
                        :src="movieDetails.Poster" alt="電影圖片">
                </el-col>
            </el-row>
            <template #footer>
                <el-button type="" @click="() => {
                    showMovieDetailDialog = false
                }
                    ">
                    離開
                </el-button>
            </template>
        </el-dialog>
        <el-backtop class=" bg-bg-1" :right="50" :bottom="50" />
    </div>
</template>
