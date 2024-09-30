<script setup lang="ts">
import { ref, inject, computed, reactive, type Ref, type CSSProperties } from 'vue'
import { useMovieStore } from "@/stores/project3Movie/movieList";
import zhTw from 'element-plus/es/locale/lang/zh-tw';
import { movieApi, type MovieSearchData, type MovieReturnData, type MovieDetails } from '@/api/project3Movie'
import { translateMovieType } from '@/commonFunction/project3Movie'
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

const { getMovieList, removeMovie } = useMovieStore()

const movieCollection = ref(getMovieList())
const nowMoviePageData = computed(() => {
    return movieCollection.value.slice(
        pageSize.value * (currentPage.value - 1),
        pageSize.value * currentPage.value
    )
})
const currentPage = ref(1)
const pageSize = ref(10)
const totalPage = computed(() => {
    return movieCollection.value.length
})
const moviesPageCount = computed(() => { return Math.ceil((totalPage.value ?? 0) / pageSize.value) })
const showMovieDetailDialog = ref(false)
const getMovieDetail = (data: MovieDetails) => {
    movieDetails.value = { ...data }
}
//詳細狀態
const movieDetails = ref<MovieDetails>({
    Title: '',
    Year: '',
    imdbID: '',
    Type: '',
    Poster: '',
})
const showDeleteDialog = ref(false)
const deleteMovie = (movie: MovieDetails) => {
    const result = removeMovie(movie)
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
            } else if (result.reason === 'MovieNotFound') {
                ElNotification({
                    title: '錯誤',
                    message: '該項目沒有在清單中',
                    type: 'error',
                    ...notificationConfig,
                });
            }
            break;

        case 'success':
            if (result.message === 'MovieRemovedSuccessfully') {
                ElNotification({
                    title: '成功',
                    message: '刪除項目成功',
                    type: 'success',
                    ...notificationConfig,
                });
                movieCollection.value = getMovieList()
                showDeleteDialog.value = false
            }
            break;
    }
}

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
            <el-table :header-cell-style="headerCellStyle" :cell-style="cellStyle" empty-text="查無資料" border
                class="mb-4 mt-3" :data="nowMoviePageData">
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
                                <el-button type="danger" @click="() => {
                                    getMovieDetail(scope.row)
                                    showDeleteDialog = true
                                }
                                    ">刪除蒐藏</el-button>
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
            <div class="w-full flex flex-justify-center mt-2">
                <el-pagination class="max-md-hidden" background v-model:current-page="currentPage"
                    v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30, 40, 50]" :total="totalPage"
                    :pager-count="7" :page-count="moviesPageCount" layout="sizes, prev, pager, next, jumper, total" />
                <el-pagination size="small" class="md-hidden" v-model:current-page="currentPage"
                    v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30, 40, 50]" :total="totalPage"
                    :pager-count="5" :page-count="moviesPageCount" layout="sizes, prev, pager, next, jumper" />
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

            <el-dialog v-model="showDeleteDialog" align-center :close-on-click-modal="false"
                :close-on-press-escape="false" :show-close="false">
                <template #header>
                    <h3 class="text-2xl font-bold">
                        刪除收藏
                    </h3>
                </template>
                <div class="text-xl">
                    確定要刪除收藏?
                </div>
                <template #footer>
                    <el-button type="" @click="() => {
                        showDeleteDialog = false
                    }
                        ">
                        取消
                    </el-button>
                    <el-button :type="'danger'" @click="() => {
                        deleteMovie(movieDetails)
                    }
                        ">
                        確定
                    </el-button>
                </template>
            </el-dialog>
        </el-config-provider>
    </div>

</template>