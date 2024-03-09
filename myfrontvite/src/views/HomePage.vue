<script setup>
import { ref, onMounted, watch } from 'vue'
import { ElTable, ElTableColumn, ElButton, ElPagination } from 'element-plus'

const total = ref(0)
const pageSize = ref(5)
const currentPage = ref(1)
const tablePageData = ref([])

//陣列 表單的要用物件的形式
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'd',
    address: '1',
  },
  {
    date: '2016-08-01',
    name: 'a',
    address: '2',
  },
  {
    date: '2016-04-02',
    name: 'f',
    address: '3',
  },
  {
    date: '2016-09-04',
    name: 't',
    address: '4',
  },
  {
    date: '2017-09-03',
    name: 'r',
    address: '5',
  },
  {
    date: '2017-05-03',
    name: 's',
    address: '6',
  },
  {
    date: '2017-05-09',
    name: 'b',
    address: '7',
  },
  {
    date: '2017-04-03',
    name: 'c',
    address: '8',
  },
  {
    date: '2017-06-09',
    name: 'o',
    address: '9',
  },
  {
    date: '2018-05-13',
    name: 'n',
    address: '10',
  },
  {
    date: '2018-05-17',
    name: 'k',
    address: '11',
  },
  {
    date: '2018-01-03',
    name: 'l',
    address: '12',
  },
  {
    date: '2018-01-23',
    name: 'x',
    address: '13',
  },
  {
    date: '2018-05-08',
    name: 'z',
    address: '14',
  },
  {
    date: '2018-08-23',
    name: 'g',
    address: '15',
  },
])

const submit = (data) => {
  alert(data)
}

onMounted(() => {
  recount()
})

//重新分頁

//利用slice 切五筆資料出來
const recount = () => {
  const startIndex = pageSize.value * (currentPage.value - 1)
  const endIndex = pageSize.value * currentPage.value

  tablePageData.value = tableData.value.slice(startIndex, endIndex)

  //更新總筆數
  total.value = tableData.value.length
}

//當三個變數只要一個東西變動時，就呼叫recount()，要加 deep 才可以找到更細項的資料
watch(
  [pageSize, currentPage, tableData],
  () => {
    recount()
  },
  { deep: true }
)

//排序
const sortChange = ({ prop, order }) => {
  if (tableData.value === undefined) return
  tableData.value = tableData.value.sort(compare(prop, order))
  recount()
}

//排序的fuction
const compare = (propertyName, sort) => (obj1, obj2) => {
  const value1 = obj1[propertyName]
  const value2 = obj2[propertyName]

  if (!value2) return -1

  if (typeof value1 === 'string' && typeof value2 === 'string')
    return (sort === 'ascending' ? 1 : -1) * value1.localeCompare(value2, 'zh')

  return (sort === 'ascending' ? 1 : -1) * (value1 <= value2 ? -1 : 1)
}
</script>

<template>
  <el-table :data="tablePageData" style="width: 100%" @sort-change="sortChange">
    <el-table-column prop="date" label="Date" width="180" sortable />
    <el-table-column prop="name" label="Name" width="180" sortable />
    <el-table-column prop="address" label="Address" sortable />
    <el-table-column fixed="right" label="Operations" width="120">
      
      <template #default="data">
        <el-button @click="submit(data.row.date)">提交</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    layout="prev, pager, next, sizes, total"
    :total="total"
    v-model:page-size="pageSize"
    v-model:current-page="currentPage"
    :page-sizes="[3, 5, 10, 30]"
  />

  <el-button @click="submit(currentPage)">分頁資訊</el-button>
</template>
