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
    ElNotification,
    ElConfigProvider,
} from 'element-plus'
import { movieApi, type MovieSearchData, type MovieReturnData, type MovieDetails } from '@/api/project3Movie'
import { useMovieStore } from "@/stores/project3Movie/movieList";
import zhTw from 'element-plus/es/locale/lang/zh-tw';
import { translateMovieType } from '@/commonFunction/project3Movie'

const { movieSearch } = movieApi
const loading = ref(false)

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
const searchMovieAPI = async () => {
    loading.value = true
    await movieSearch({ ...beforeSendSearch_API_Data.value }).then(async (res) => {
        returnMovieData.value = res.data as MovieReturnData
    })
    loading.value = false
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

const { addMovie } = useMovieStore()

const handleAddMovie = (movie: MovieDetails) => {
    const result = addMovie(movie)
    const notificationConfig = {
        duration: 5000,
        position: 'bottom-right' as const,
    };

    switch (result.status) {
        case 'failure':
            if (result.reason === 'NoDataProvided') {
                ElNotification({
                    title: '錯誤',
                    message: '沒有添加檔案',
                    type: 'error',
                    ...notificationConfig,
                });
            } else if (result.reason === 'DataAlreadyExists') {
                ElNotification({
                    title: '錯誤',
                    message: '該項目已在清單中',
                    type: 'error',
                    ...notificationConfig,
                });
            }
            break;

        case 'success':
            if (result.message === "AddSuccess") {
                ElNotification({
                    title: '成功',
                    message: '加入清單成功',
                    type: 'success',
                    ...notificationConfig,
                });
            }
            break;
    }

}

const validateAndSearch = () => {
    searchMovieRef.value.validate((valid: boolean) => {
        if (valid) {
            beforeSendSearch_API_Data.value = { ...beforeSendSearch_API_Data.value, ...searchMovieData.value, page: 1 };
            searchMovieData.value.title.trim() && searchMovieAPI();
        }
    });
};

//CSS回傳
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
    <div class="container mb-50px">
        <el-config-provider :locale="zhTw">
            <el-form v-loading="loading" @submit.prevent ref="searchMovieRef" :model="searchMovieData"
                label-position="right" label-width="auto" class="flex w-100%" :rules="rules">
                <el-row class="w-full">
                    <el-col class="p-2" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                        <el-form-item class="flex text-center flex-items-center mb-5 pe-3" label="電影名稱：" prop="title">
                            <el-input v-model="searchMovieData.title" @keydown.enter="validateAndSearch" />
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
                            <el-input v-model="searchMovieData.y" @keydown.enter="validateAndSearch" />
                        </el-form-item>
                    </el-col>
                    <el-col class="p-2" :span="6">
                        <el-button type="primary" @click="() => {
                            validateAndSearch()
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
                                    handleAddMovie(scope.row)
                                }
                                    ">加入蒐藏</el-button>
                            </div>
                            <div>
                                <el-button type="success" @click="() => {
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
                <el-pagination class="max-md-hidden" background v-model:current-page="beforeSendSearch_API_Data.page"
                    :page-size="10" :total="parseInt(returnMovieData.totalResults ?? 0)" :pager-count="7"
                    :page-count="moviesPageCount" layout="prev, pager, next, jumper, total" @current-change="(nowPageNumber) => {
                        beforeSendSearch_API_Data.page = nowPageNumber;
                        searchMovieAPI();
                    }" />
                <el-pagination size="small" class="md-hidden" v-model:current-page="beforeSendSearch_API_Data.page"
                    :page-size="10" :total="parseInt(returnMovieData.totalResults ?? 0)" :pager-count="5"
                    :page-count="moviesPageCount" layout="prev, pager, next, jumper" @current-change="(nowPageNumber) => {
                        beforeSendSearch_API_Data.page = nowPageNumber;
                        searchMovieAPI();
                    }" />
            </div>
            <el-dialog fullscreen v-model="showMovieDetailDialog">
                <template #header>
                    <h3 class="text-4xl">
                        詳細資料
                    </h3>
                </template>
                <el-row class="w-full flex-wrap-reverse">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="w-full max-sm-mt-10">
                            <el-descriptions :column="1">
                                <el-descriptions-item label="電影名稱：" label-class-name="md-text-2xl"
                                    class-name="md-text-2xl">{{
                                        movieDetails.Title }}</el-descriptions-item>
                                <el-descriptions-item label="發行年分：" label-class-name="md-text-2xl"
                                    class-name="md-text-2xl">{{
                                        movieDetails.Year }}</el-descriptions-item>
                                <el-descriptions-item label="類型：" label-class-name="md-text-2xl"
                                    class-name="md-text-2xl">{{
                                        translateMovieType(movieDetails.Type) }}</el-descriptions-item>
                                <el-descriptions-item label="imdbID：" label-class-name="md-text-2xl"
                                    class-name="md-text-2xl">{{
                                        movieDetails.imdbID }}</el-descriptions-item>
                            </el-descriptions>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="w-full flex justify-center">
                            <img class="w-full object-contain max-w500px" v-if="movieDetails.Poster != 'N/A'"
                                :src="movieDetails.Poster" alt="電影圖片">
                        </div>
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
            <el-backtop class="bg-bg-1 max-md-hidden" :right="50" :bottom="50" />
        </el-config-provider>
    </div>
</template>
