<script setup lang="ts">
import {} from 'vue-router'
import { ref, inject, computed, reactive, type Ref } from 'vue'
import {
  type FormRules,
  ElForm,
  ElFormItem,
  ElButton,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElSelect,
  ElDialog,
  ElOption
} from 'element-plus'
import { toDoListapi } from '@/api/vue3API'
import { sendElNotification } from '@/commonFunction/elnotification'

const { toDoListSearch, toDoListInsert, toDoListModify, toDoListDelete } = toDoListapi

//畫面控制
const loading = ref(false)

const dialogModel1 = ref(false)
const dialogTitleName1 = ref('')

const dialogModel2 = ref(false)
const dialogTitleName2 = ref('')
const dialogBody2 = ref('')

const buttonType8 = computed(() => (dialogTitleName2.value === '刪除' ? 'danger' : 'primary'))
//表單1號
const formRef1 = ref()
const fronmData1 = reactive<any>({
  list_name: '',
  done_yn: '',
  description: ''
})

//表單2號
const formRef2 = ref()
const formData2 = reactive<any>({
  list_name: '',
  done_yn: '',
  description: ''
})
const formRule2 = ref<FormRules>({
  list_name: [{ required: true, message: '此欄位必填' }]
})

//表格一號
const tableDataAll1 = ref<any>([])
const tableDataRecord1 = ref(10)
const tableAllRecord1 = computed(() => tableDataAll1.value.length)
const tableDataCurrentPage = ref(1)
const tableData1 = computed(() => {
  return tableDataAll1.value.slice(
    tableDataRecord1.value * (tableDataCurrentPage.value - 1),
    tableDataRecord1.value * tableDataCurrentPage.value
  )
})

//下拉選單
const option1 = ref([
  { label: '已完成', value: 'Y' },
  { label: '未完成', value: 'N' }
])

//按鈕功能
//搜尋按鈕
const doButtonFunction1 = async () => {
  let d = {
    list_name: fronmData1.list_name,
    description: fronmData1.description,
    done_yn: fronmData1.done_yn
  }
  loading.value = true
  await toDoListSearch(d).then(async (res) => {
    tableDataAll1.value = [...res.data]
  })
  loading.value = false
}

//新增按鈕
const doButtonFunction2 = async () => {
  for (const i in formData2) {
    formData2[i] = ''
  }
  dialogTitleName1.value = '新增'
  dialogModel1.value = true
}

//表單1編輯按鈕
const doButtonFunction3 = async (data: any) => {
  dialogTitleName1.value = '編輯'
  for (const i in data.row) {
    formData2[i] = data.row[i]
  }
  dialogModel1.value = true
}

//表單1刪除按鈕
const doButtonFunction4 = async (data: any) => {
  dialogTitleName1.value = '刪除'
  dialogTitleName2.value = '刪除'
  for (const i in data.row) {
    formData2[i] = data.row[i]
  }
  dialogModel2.value = true
}

//彈出視窗1取消
const doButtonFunction5 = async () => {
  dialogModel1.value = false
}

//彈出視窗1確定後跳出最終確認視窗
const doButtonFunction6 = async () => {
  formRef2.value.validate((isAllow: boolean, message: any) => {
    console.log(message)
    if (isAllow) {
      if (dialogTitleName1.value === '新增') {
        dialogTitleName2.value = '確定新增'
        dialogBody2.value = '確定新增該筆資料嗎?'
      } else {
        dialogTitleName2.value = '確定編輯'
        dialogBody2.value = '確定編輯該筆資料嗎?'
      }
      dialogModel2.value = true
    } else {
      switch (message.list_name[0]?.field) {
        case 'list_name':
          sendElNotification('warning', '待辦事項欄位為必填')
          break

        default:
          break
      }
    }
  })
}

//彈出視窗2取消回
const doButtonFunction7 = async () => {
  dialogModel2.value = false
}

//彈出視窗2確定後做事
const doButtonFunction8 = async () => {
  let d: any = {}
  for (const i in formData2) {
    d[i] = formData2[i]
  }
  loading.value = true

  if (dialogTitleName1.value === '新增') {
    await toDoListInsert(d)
      .then(async () => {
        await toDoListSearch({
          list_name: '',
          description: '',
          done_yn: ''
        }).then((res) => {
          tableDataAll1.value = [...res.data]

          sendElNotification('success', '新增成功')
          dialogModel1.value = false
        })
      })
      .catch((error) => {
        sendElNotification('error', '新增失敗' + error)
      })
  } else if (dialogTitleName1.value === '編輯') {
    await toDoListModify(d)
      .then(async () => {
        await toDoListSearch({
          list_name: '',
          description: '',
          done_yn: ''
        }).then((r) => {
          tableDataAll1.value = [...r.data]
          sendElNotification('success', '編輯成功')
          dialogModel1.value = false
        })
      })
      .catch((error) => {
        sendElNotification('error', '編輯失敗' + error)
      })
  } else if (dialogTitleName2.value === '刪除') {
    await toDoListDelete(d)
      .then(async () => {
        await toDoListSearch({
          list_name: '',
          description: '',
          done_yn: ''
        }).then((r) => {
          tableDataAll1.value = [...r.data]
          sendElNotification('success', '刪除成功')
          dialogModel1.value = false
        })
      })
      .catch((error) => {
        sendElNotification('error', '刪除失敗' + error)
      })
  }

  loading.value = false
  dialogModel2.value = false
}

//人數統計資料表排序
const tableDataSortChange1 = ({ prop, order }: any) => {
  tableDataAll1.value.sort(compare(prop, order))
}
//排序的fuction
const compare: any = (propertyName: any, sort: any) => {
  return function (obj1:any, obj2:any) {
    let value1:string = obj1[propertyName]
    let value2:string = obj2[propertyName]
    if (!value2) {
      return -1
    }
    if (typeof value1 === 'string' && typeof value2 === 'string') {
      const res = value1.localeCompare(value2, 'zh')
      return sort === 'ascending' ? res : -res
    } else {
      if (value1 <= value2) {
        return sort === 'ascending' ? -1 : 1
      } else if (value1 > value2) {
        return sort === 'ascending' ? 1 : -1
      }
    }
  }
}

//CSS回傳區
//顏色
const headerCellStyle = () => {
  return {
    backgroundColor: '#F5F7FA',
    color: '#909399'
  }
}

const cellStyle = () => {
  return {
    color: '#303133'
  }
}
</script>
<template>
  <el-form
    @submit.prevent
    ref="formRef1"
    :model="fronmData1"
    label-position="left"
    label-width="fit-content"
    class="flex w-100%"
  >
    <el-col class="p-2" :span="6">
      <el-form-item
        class="flex text-center flex-items-center mb-5 pe-3"
        label="待辦事項："
        prop="list_name"
      >
        <el-input v-model="fronmData1.list_name" />
      </el-form-item>
    </el-col>
    <el-col class="p-2" :span="6">
      <el-form-item
        class="flex text-center flex-items-center mb-5 pe-3"
        label="詳細資訊："
        prop="description"
      >
        <el-input v-model="fronmData1.description" />
      </el-form-item>
    </el-col>
    <el-col class="p-2" :span="6">
      <el-form-item
        class="flex text-center flex-items-center mb-5 pe-3"
        label="是否完成："
        prop="description"
      >
        <el-select v-model="fronmData1.done_yn" clearable>
          <el-option v-for="i in option1" :key="i.label" :value="i.value" :label="i.label" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col class="p-2" :span="4">
      <el-button
        @click="
          () => {
            doButtonFunction1()
          }
        "
      >
        搜尋
      </el-button>
    </el-col>
  </el-form>
  <el-button class="ms-2 mb-2" type="primary" @click="doButtonFunction2()">新增</el-button>
  <el-table
    :header-cell-style="headerCellStyle"
    @sort-change="tableDataSortChange1"
    :cell-style="cellStyle"
    empty-text="查無資料"
    border
    class="mb-4 mt-3"
    :data="tableData1"
  >
    <el-table-column prop="list_name" width="200px" label="待辦事項" sortable />
    <el-table-column prop="done_yn" width="158px" label="已完成" sortable>
      <template #default="scope"> {{ scope.row.done_yn === 'Y' ? '已完成' : '未完成' }}</template>
    </el-table-column>
    <el-table-column prop="description" label="詳細資訊" sortable />
    <el-table-column prop="update_time" width="110px" label="更新時間" sortable>
      <template #default="scope">
        {{ new Date(scope.row.update_time).toLocaleDateString() }}</template
      >
    </el-table-column>
    <el-table-column fixed="right" prop="" width="158px" label="操作">
      <template #default="scope">
        <el-button
          type="warning"
          @click="
            () => {
              doButtonFunction3(scope)
            }
          "
          >編輯</el-button
        >
        <el-button
          type="danger"
          @click="
            () => {
              doButtonFunction4(scope)
            }
          "
          >刪除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- 頁簽 -->
  <div class="w-full flex flex-justify-center mt-2">
    <el-pagination
      v-model:page-size="tableDataRecord1"
      v-model:current-page="tableDataCurrentPage"
      :page-sizes="[5, 10, 20, 30, 40, 50]"
      background
      :pager-count="11"
      layout="total,sizes,prev, pager, next,jumper"
      :total="tableAllRecord1"
    />
  </div>
  <el-dialog
    fullscreen
    v-model="dialogModel1"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <template #header>
      <h3>
        {{ dialogTitleName1 }}
      </h3>
    </template>
    <el-form
      :rules="formRule2"
      @submit.prevent
      ref="formRef2"
      :model="formData2"
      label-position="left"
      label-width="fit-content"
      class="flex flex-wrap w-100%"
    >
      <el-col class="p-2" :span="12">
        <el-form-item
          class="flex text-center flex-items-center mb-5 pe-3"
          label="待辦事項："
          prop="list_name"
        >
          <el-input v-model="formData2.list_name" />
        </el-form-item>
      </el-col>
      <el-col class="p-2" :span="12">
        <el-form-item
          class="flex text-center flex-items-center mb-5 pe-3"
          label="詳細資訊："
          prop="description"
        >
          <el-input v-model="formData2.description" />
        </el-form-item>
      </el-col>
      <el-col class="p-2" :span="12">
        <el-form-item
          class="flex text-center flex-items-center mb-5 pe-3"
          label="是否完成："
          prop="description"
        >
          <el-select v-model="formData2.done_yn" clearable>
            <el-option v-for="i in option1" :key="i.label" :value="i.value" :label="i.label" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-form>
    <template #footer>
      <el-button
        type=""
        @click="
          () => {
            doButtonFunction5()
          }
        "
      >
        取消
      </el-button>
      <el-button
        type="primary"
        @click="
          () => {
            doButtonFunction6()
          }
        "
      >
        確定
      </el-button>
    </template>
  </el-dialog>
  <el-dialog
    v-model="dialogModel2"
    align-center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <template #header>
      <h3>
        {{ dialogTitleName2 }}
      </h3>
    </template>
    {{ dialogBody2 }}
    <template #footer>
      <el-button
        type=""
        @click="
          () => {
            doButtonFunction7()
          }
        "
      >
        取消
      </el-button>
      <el-button
        :type="buttonType8"
        @click="
          () => {
            doButtonFunction8()
          }
        "
      >
        確定
      </el-button>
    </template>
  </el-dialog>
</template>
