<template>
  <sh-checkbox :options="checkData" v-model="value1"></sh-checkbox>
  <sh-table :columns="columns" :data="data"></sh-table>
  <sh-upload>
    <sh-icon icon="codescan-24"></sh-icon>
    <div>上传文件</div>
  </sh-upload>
  <sh-switch v-model="value2" @change="changeValue" active-text="是" inactive-text="否"></sh-switch>
  <sh-tag type="primary">tag1</sh-tag>
  <sh-tag type='success'>tag1</sh-tag>
  <sh-tag type='info'>tag1</sh-tag>
  <sh-tag type='warning'>tag1</sh-tag>
  <sh-tag type='danger'>tag1</sh-tag>
  <sh-tag type='blue'>tag1</sh-tag>
  <sh-tag type='red'>tag1</sh-tag>
  <sh-tag type='yellow'>tag1</sh-tag>
  <sh-tag type='green'>tag1</sh-tag>
  <sh-tag type='purple'>tag1</sh-tag>
  <sh-tag type='pink'>tag1</sh-tag>
  <sh-tag type='cyan'>tag1</sh-tag>
  <sh-tag type='orange'>tag1</sh-tag>
  <sh-radio-group v-model="radioValue2">
    <sh-radio value="1">篮球</sh-radio>
    <sh-radio value="2">排球</sh-radio>
  </sh-radio-group>
  <div class="radio">
    <sh-radio v-model="radioValue1" value="1">苹果</sh-radio>
    <sh-radio v-model="radioValue1" value="2">香蕉</sh-radio>
  </div>

  <div>
    <sh-icon icon="no-entry-24"></sh-icon>
  </div>
  <sh-button round></sh-button>
  <!-- <sh-input v-model="value1">
      <template #prepend>
          <span>http://</span>
      </template>
<template #append>
          <sh-icon icon="share-24"></sh-icon>
      </template>
</sh-input> -->
  <ShSelect :options="options" placeholder="请选择你喜欢的水果"></ShSelect>
</template>
<script setup lang="ts">
//import ShUpload from "../../packages/components/upload/index"

import { ref } from "vue"
import { Options } from "../../packages/types/select-type"
import { Column } from "../../packages/components/table/type/index"
const value1 = ref([])
const value2 = ref(true)
const radioValue1 = ref("")
const radioValue2 = ref("")
const valuec4 = ref([])

const changeValue = (val) => {
  console.log("value1", value1.value)
  console.log("valuec4===>", valuec4.value)
  console.log("changeValue===>", val)
}
const checkData = [
  {
    label: "中国",
    value: 1,
    indeterminate: true
  },
  {
    label: "日本",
    value: 2,
    border: true
  },
  {
    label: "美国",
    value: 3,
    checked: true
  },
  {
    label: "俄罗斯",
    value: 4
  }
]
const data = [
  {
    date: '323232',
    name: 'wang',
    province: 'province',
    city: 'city',
    address: 'address',
    zip: 333
  },
  {
    date: '32323221',
    name: 'wang1',
    province: 'province1',
    city: 'city11',
    address: 'address1',
    zip: 555
  },
  {
    date: '32323221',
    name: 'wang1',
    province: 'province1',
    city: 'city11',
    address: 'address1',
    zip: 555
  },
  {
    date: '32323221',
    name: 'wang1',
    province: 'province1',
    city: 'city11',
    address: 'address1',
    zip: 555
  },
  {
    date: '32323221',
    name: 'wang1',
    province: 'province1',
    city: 'city11',
    address: 'address1',
    zip: 555
  }
]
const columns: Column[] = [
  { type: 'selection' },
  { type: 'index', title: '序号' },
  {
    title: '日期',
    children: [
      { key: 'name', title: '农历' },
      {
        title: '公历',
        key: 'name',
      }
    ]
  },
  {
    title: '配送信息',
    children: [
      {  title: '姓名',
      children: [
          { key: 'province', title: '中文' },
          { key: 'city', title: '英文' }
        ]
      },
      {
        title: '地址',
        children: [
          { key: 'province', title: '省份' },
          { key: 'city', title: '市区' },
          { title: '详细地址',
          children: [
          { key: 'province', title: '国内' },
          { key: 'city', title: '国外' },
          { key: 'address', title: '老家'}
        ]
          }
        ]
      }
    ]
  },
  { key: 'zip', title: '编码' }
]
const options: Options[] = [
  { name: "香蕉", value: 1 },
  { name: "苹果", value: 2 },
  { name: "菠萝", value: 3 },
  { name: "哈密瓜", value: 4 },
  { name: "榴莲", value: 5 },
  { name: "猕猴桃啊", value: 6 },
]
</script>
<style scoped></style>