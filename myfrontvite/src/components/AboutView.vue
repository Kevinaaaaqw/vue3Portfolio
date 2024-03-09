<script setup>
import { ElForm, ElFormItem, ElInput, ElDatePicker, ElButton, ElRow, ElCol } from 'element-plus'
import { ref, reactive } from 'vue'

const formRef = ref('')
const formData = ref({ account: '', password: '', date: '' })

const res = ref({ account: 'no', password: 'no', date: 'no' })

//搜尋按鈕功能
const doButtonFunction = (data) => {
  formRef.value.validate((isAllow, list) => {
    console.log(isAllow)
    if (isAllow) {
      res.value.account = data.account
      res.value.password = data.password
      res.value.date = data.date
    } else {
    }
  })
}

const rule = ref({
  account: [
    { required: true, message: '請輸入' }
    // { pattern: /^\d{1}$/, message: '必須是數字' }
  ]
})
</script>

<template>
  <el-form :rules="rule" ref="formRef" :model="formRef" @submit.prevent>
    <el-row>
      <el-col :span="12">
        <el-form-item prop="account" label="帳號:">
          <el-input v-model="formData.account" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="password" label="密碼:">
          <el-input v-model="formData.password" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="date" label="日期:">
          <el-date-picker v-model="formData.date" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-button type="primary" @click="doButtonFunction(formData)">提交</el-button>
      </el-col>
    </el-row>
  </el-form>

  <div>
    <div>{{ '帳號:' + res.account }}</div>
    <div>{{ '密碼:' + res.password }}</div>
    <div>{{ '時間:' + res.date }}</div>
  </div>
</template>
